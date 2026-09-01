'use server'

import { Demografia, Genero } from "@/src/types/enum";

type KitsuMangaAttributes = {
    canonicalTitle?: string;
    titles?: {
        en?: string;
        en_jp?: string;
        ja_jp?: string;
    };
    synopsis?: string;
    volumeCount?: number;
    startDate?: string;
    posterImage?: {
        large?: string;
        original?: string;
        medium?: string;
    };
    ageRating?: string;
    subtype?: string;
};

type KitsuMangaItem = {
    id: string;
    attributes: KitsuMangaAttributes;
};

type KitsuCategoryItem = {
    id: string;
    attributes?: {
        title?: string;
    };
};

type KitsuStaffIncludedPerson = {
    id: string;
    type: string;
    attributes?: {
        name?: string;
    };
};

type KitsuStaffResponse = {
    data?: Array<{
        attributes?: {
            role?: string;
        };
        relationships?: {
            person?: {
                data?: {
                    id: string;
                };
            };
        };
    }>;
    included?: KitsuStaffIncludedPerson[];
};

function mapearGenero(categorias: string[]): Genero {
    const catLower = categorias.map((c) => c.toLowerCase());

    if (catLower.some((c) => c.includes("action") || c.includes("ação"))) return Genero.ACAO;
    if (catLower.some((c) => c.includes("adventure") || c.includes("aventura"))) return Genero.AVENTURA;
    if (catLower.some((c) => c.includes("comedy") || c.includes("comédia"))) return Genero.COMEDIA;
    if (catLower.some((c) => c.includes("drama"))) return Genero.DRAMA;
    if (catLower.some((c) => c.includes("fantasy") || c.includes("fantasia"))) return Genero.FANTASIA;
    if (catLower.some((c) => c.includes("sci-fi") || c.includes("science fiction"))) return Genero.FICCAO_CIENTIFICA;
    if (catLower.some((c) => c.includes("romance"))) return Genero.ROMANCE;
    if (catLower.some((c) => c.includes("suspense") || c.includes("mystery") || c.includes("misterio"))) return Genero.SUSPENSE;
    if (catLower.some((c) => c.includes("horror") || c.includes("terror"))) return Genero.TERROR;

    return Genero.ACAO;
}

function mapearDemografia(manga: KitsuMangaAttributes, categorias: string[]): Demografia {
    const catLower = categorias.map((c) => c.toLowerCase());
    const tituloLower = (manga.canonicalTitle || "").toLowerCase();

    if (catLower.includes("seinen") || catLower.includes("manga seinen")) return Demografia.SEINEN;
    if (catLower.includes("shoujo") || catLower.includes("shojo")) return Demografia.SHOJO;
    if (catLower.includes("josei")) return Demografia.JOSEI;
    if (catLower.includes("kids") || manga.ageRating === "G") return Demografia.KODOMO;

    if (tituloLower.includes("seinen")) return Demografia.SEINEN;
    return Demografia.SHONEN;
}

async function buscarCategoriasManga(mangaId: string): Promise<string[]> {
    try {
        const res = await fetch(`https://kitsu.io/api/edge/manga/${mangaId}/categories?page[limit]=10`, {
            headers: { Accept: "application/vnd.api+json" },
        });
        if (!res.ok) return [];
        const json = await res.json();
        
        if (json.data && Array.isArray(json.data)) {
            return (json.data as KitsuCategoryItem[]).map((cat) => cat.attributes?.title || "").filter(Boolean);
        }
        return [];
    } catch {
        return [];
    }
}

async function buscarAutorManga(mangaId: string): Promise<string> {
    try {
        const res = await fetch(`https://kitsu.io/api/edge/manga/${mangaId}/staff?include=person&page[limit]=5`, {
            headers: { Accept: "application/vnd.api+json" },
        });
        if (!res.ok) return "Autor Desconhecido";

        const json: KitsuStaffResponse = await res.json();
        if (!json.data || json.data.length === 0 || !json.included) return "Autor Desconhecido";

        const staffItem = json.data.find((s) => {
            const role = (s.attributes?.role || "").toLowerCase();
            return role.includes("story") || role.includes("art") || role.includes("original work") || role.includes("author");
        }) || json.data[0];

        const personId = staffItem?.relationships?.person?.data?.id;
        if (!personId) return "Autor Desconhecido";

        const person = json.included.find((p) => p.id === personId && p.type === "people");
        return person?.attributes?.name || "Autor Desconhecido";
    } catch {
        return "Autor Desconhecido";
    }
}

export async function buscarMangaKitsu(termo: string) {
    if (!termo || !termo.trim()) return null;

    try {
        const termoLimpo = termo.trim();

        const matchUrlId = termoLimpo.match(/\/manga\/(\d+)/) || termoLimpo.match(/^(\d+)$/);
        const idEncontrada = matchUrlId ? matchUrlId[1] : null;

        const endpoint = idEncontrada
            ? `https://kitsu.io/api/edge/manga/${idEncontrada}`
            : `https://kitsu.io/api/edge/manga?filter[text]=${encodeURIComponent(termoLimpo)}&page[limit]=1`;

        console.log("Buscando na Kitsu API Endpoint:", endpoint);

        const res = await fetch(endpoint, {
            headers: { Accept: "application/vnd.api+json" },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Erro HTTP Kitsu: Status ${res.status}`);
            return null;
        }

        const json = await res.json();
        
        const mangaData: KitsuMangaItem | undefined = idEncontrada ? json.data : json.data?.[0];

        if (!mangaData) {
            console.warn("Nenhum mangá encontrado na Kitsu API.");
            return null;
        }

        const mangaId = mangaData.id;
        const attr = mangaData.attributes;

        const [categorias, autor] = await Promise.all([
            buscarCategoriasManga(mangaId),
            buscarAutorManga(mangaId),
        ]);

        console.log("Encontrado com sucesso via Kitsu API!");

        return {
            titulo: attr.canonicalTitle || attr.titles?.en || attr.titles?.en_jp || "",
            descricao: attr.synopsis || "Sem descrição disponível.",
            imagem: attr.posterImage?.large || attr.posterImage?.original || attr.posterImage?.medium || "",
            autor: autor,
            ano: attr.startDate ? new Date(attr.startDate).getFullYear() : new Date().getFullYear(),
            genero: mapearGenero(categorias),
            demografia: mapearDemografia(attr, categorias),
            volume: attr.volumeCount || 1,
        };
    } catch (error) {
        console.error("Erro ao buscar no Kitsu:", error);
        return null;
    }
}

'use server'

import { Demografia, Genero } from "@/src/types/enum";

const GENERO_MAP: Record<string, Genero> = {
    "Action": Genero.ACAO,
    "Adventure": Genero.AVENTURA,
    "Comedy": Genero.COMEDIA,
    "Drama": Genero.DRAMA,
    "Fantasy": Genero.FANTASIA,
    "Sci-Fi": Genero.FICCAO_CIENTIFICA,
    "Romance": Genero.ROMANCE,
    "Slice of Life": Genero.SLICE_OF_LIFE,
    "Suspense": Genero.SUSPENSE,
    "Horror": Genero.TERROR,
};


const DEMOGRAFIA_MAP: Record<string, Demografia> = {
    "Shounen": Demografia.SHONEN,
    "Seinen": Demografia.SEINEN,
    "Shoujo": Demografia.SHOJO,
    "Josei": Demografia.JOSEI,
    "Kids": Demografia.KODOMO,
};

async function buscarNoKitsu(termo: string) {
    try {
        console.log("Tentando busca de reserva via Kitsu API...");

        const termoLimpo = termo.replace(/https?:\/\/[^\s]+/g, "").replace(/-/g, " ").trim();
        const endpoint = `https://kitsu.io/api/edge/manga?filter[text]=${encodeURIComponent(termoLimpo)}&page[limit]=1`;

        const res = await fetch(endpoint, {
            headers: { "Accept": "application/vnd.api+json" },
            cache: "no-store"
        });

        if (!res.ok) return null;

        const data = await res.json();
        const manga = data?.data?.[0]?.attributes;

        if (!manga) return null;

        console.log("Encontrado com sucesso via Kitsu API!");

        return {
            titulo: manga.canonicalTitle || manga.titles?.en || manga.titles?.en_jp || "",
            descricao: manga.synopsis || "Sem descrição disponível.",
            imagem: manga.posterImage?.large || manga.posterImage?.original || "",
            autor: "Autor Desconhecido",
            ano: manga.startDate ? new Date(manga.startDate).getFullYear() : new Date().getFullYear(),
            genero: Genero.ACAO,
            demografia: Demografia.SHONEN,
            volume: manga.volumeCount || 1,
        };
    } catch (err) {
        console.error("Falha no fallback do Kitsu:", err);
        return null;
    }
}

export async function buscarMangaJikan(termo: string) {
    if (!termo || !termo.trim()) return null;

    try {
        const termoLimpo = termo.trim();
        const matchUrlId = termoLimpo.match(/\/manga\/(\d+)/) || termoLimpo.match(/^(\d+)$/);
        const idEncontrada = matchUrlId ? matchUrlId[1] : null;

        const endpoint = idEncontrada ? `https://api.jikan.moe/v4/manga/${idEncontrada}`
        : `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(termoLimpo)}&limit=1`;

        console.log("Buscando no Jikan Endpoint:", endpoint);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(endpoint, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/json",
            },
            cache: "no-store",
            signal: controller.signal
        }).finally(() => clearTimeout(timeoutId));

        if (!res.ok) {
            console.warn(`Erro HTTP Jikan: Status ${res.status}. Acionando fallback...`);
            return await buscarNoKitsu(termoLimpo);
        }

        const data = await res.json();

        const manga = idEncontrada ? data.data : data.data?.[0];

        if (!manga) {
            console.warn("Nenhum mangá encontrado no Jikan. Acionando fallback...");
            return await buscarNoKitsu(termoLimpo);
        }

        const rawGenero = manga.genres?.[0]?.name || "";
        const generoValido = GENERO_MAP[rawGenero] || Genero.ACAO;

        const rawDemografia = manga.demographics?.[0]?.name || "";
        const demografiaValida = DEMOGRAFIA_MAP[rawDemografia] || Demografia.SHONEN;

        console.log("Encontrado com sucesso via Jikan API!");

        return {
            titulo: manga.title || manga.title_english || "",
            descricao: manga.synopsis || "Sem descrição disponível.",
            imagem: manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url || "",
            autor: manga.authors?.[0]?.name || "Autor Desconhecido",
            ano: manga.published?.prop?.from?.year || new Date().getFullYear(),
            genero: generoValido,
            demografia: demografiaValida,
            volume: manga.volumes || 1,
        };
    } 
    catch (error) {
        console.error("Jikan API indisponível ou fora do ar. Usando Kitsu como alternativa...", error);
        return await buscarNoKitsu(termo);
    }
}
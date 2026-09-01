import "dotenv/config";
import { Genero, Demografia } from "../generated/prisma/client";
import { prisma } from "@/src/lib/prisma";

type KitsuMangaAttributes = {
  canonicalTitle: string;
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
  relationships?: {
    categories?: {
      links?: {
        related?: string;
      };
    };
  };
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mapearDemografia(manga: KitsuMangaAttributes, categorias: string[]): Demografia{
  const catLower = categorias.map((c) => c.toLowerCase());
  const tituloLower = (manga.canonicalTitle || "").toLowerCase();

  if (catLower.includes("seinen") || catLower.includes("manga seinen")) return Demografia.SEINEN;
  if (catLower.includes("shoujo") || catLower.includes("shojo")) return Demografia.SHOJO;
  if (catLower.includes("josei")) return Demografia.JOSEI;
  if (catLower.includes("kids") || manga.ageRating === "G") return Demografia.KODOMO;

  if (tituloLower.includes("seinen")) return Demografia.SEINEN;
  return Demografia.SHONEN;
}

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
    if (!json.data || json.data.length === 0 || !json.included) {
      return "Autor Desconhecido";
    }

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



async function main() {
  console.log("Limpando produtos existentes no banco...");
  await prisma.produto.deleteMany({});

  console.log("Buscando mangás da API do Kitsu...");

  const LIMIT_POR_PAGINA = 20;
  const TOTAL_PAGINAS = 5;
  let todosMangas: KitsuMangaItem[] = [];

  for (let pagina = 0; pagina < TOTAL_PAGINAS; pagina++) {
    const offset = pagina * LIMIT_POR_PAGINA;
    console.log(`Buscando página ${pagina + 1} de ${TOTAL_PAGINAS} (Offset ${offset})...`);

    const url = `https://kitsu.io/api/edge/manga?sort=-averageRating&page[limit]=${LIMIT_POR_PAGINA}&page[offset]=${offset}`;

    const response = await fetch(url, {
      headers: { Accept: "application/vnd.api+json" },
    });

    if (!response.ok) {
      console.warn(`Erro na página ${pagina + 1}: Status ${response.status}. Pulando...`);
      continue;
    }

    const json = await response.json();

    if (json.data && Array.isArray(json.data)) {
      todosMangas = todosMangas.concat(json.data as KitsuMangaItem[]);
    }

    await sleep(1000);
  }

  console.log(`Total de ${todosMangas.length} mangás obtidos da Kitsu API! Salvando no banco...`);

  for (const item of todosMangas) {
    const attr = item.attributes;

    const [categorias, autor] = await Promise.all([
      buscarCategoriasManga(item.id),
      buscarAutorManga(item.id),
    ]);

    const tituloFormatado = attr.canonicalTitle || attr.titles?.en || attr.titles?.en_jp || "Título Desconhecido";
    const anoLancamento = attr.startDate ? new Date(attr.startDate).getFullYear() : 2024;
    const precoAleatorio = Math.floor(Math.random() * 31) + 29 + 0.9; 

    const imagemCapa =
      attr.posterImage?.large ||
      attr.posterImage?.original ||
      attr.posterImage?.medium ||
      "https://via.placeholder.com/300x450?text=Sem+Capa";

    await prisma.produto.create({
      data: {
        titulo: tituloFormatado,
        descricao: attr.synopsis || "Sem descrição disponível.",
        preco: precoAleatorio,
        volume: attr.volumeCount || 1,
        autor: autor,
        ano: anoLancamento,
        imagem: imagemCapa,
        estoque: Math.floor(Math.random() * 50) + 10,
        genero: mapearGenero(categorias),
        demografia: mapearDemografia(attr, categorias),
      },
    });

    console.log(`Adicionado ao banco: ${tituloFormatado} (Autor: ${autor})`);
    await sleep(500); 
  }

  console.log("Banco de dados povoado com sucesso via Kitsu API!");
}

main().catch((e) => {
  console.error("Erro durante a execução do seed:", e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
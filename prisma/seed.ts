import "dotenv/config";
import { Genero, Demografia } from "../generated/prisma/client";
import { prisma } from "@/utils/prisma";

//Type para recuperar os generos e demografia
type MALItem = {
  name: string;
};

//Type para recuperar o manga e seus atributos
type MALManga = {
  title: string;
  title_english?: string;
  synopsis?: string;
  volumes?: number;
  published?: {
    from?: string;
  };
  authors?: Array<{ name: string }>;
  images?: {
    jpg?: {
      image_url?: string;
      large_image_url?: string;
    };
  };
  genres?: MALItem[];
  demographics?: MALItem[];
};

//sleep para poder pegar mais do que 20 mangas
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//mapa de genero
function mapearGenero(genres: MALItem[]): Genero {
  const nomes = genres.map((g) => g.name.toLowerCase());
  if (nomes.includes("action")) return Genero.ACAO;
  if (nomes.includes("adventure")) return Genero.AVENTURA;
  if (nomes.includes("comedy")) return Genero.COMEDIA;
  if (nomes.includes("drama")) return Genero.DRAMA;
  if (nomes.includes("fantasy")) return Genero.FANTASIA;
  if (nomes.includes("sci-fi")) return Genero.FICCAO_CIENTIFICA;
  if (nomes.includes("romance")) return Genero.ROMANCE;
  if (nomes.includes("suspense") || nomes.includes("mystery")) return Genero.SUSPENSE;
  if (nomes.includes("horror")) return Genero.TERROR;

  return Genero.ACAO;
}

//mapa de demografia
function mapearDemografia(demographics: MALItem[]): Demografia {
  const nomes = demographics.map((d) => d.name.toLowerCase());
  if (nomes.includes("shounen") || nomes.includes("shonen"))
    return Demografia.SHONEN;
  if (nomes.includes("seinen")) return Demografia.SEINEN;
  if (nomes.includes("shoujo") || nomes.includes("shojo"))
    return Demografia.SHOJO;
  if (nomes.includes("josei")) return Demografia.JOSEI;
  if (nomes.includes("kids")) return Demografia.KODOMO;

  return Demografia.SHONEN;
}

//consumo da api do My Anime List

async function main() {
  console.log("Buscando mangás da API do MyAnimeList...");

  const TOTAL_PAGINAS = 2;
  let todosMangas: MALManga[] = [];

  //loop para poder pegar mais de uma pagina de manga do myanimelist
  for (let pagina = 1; pagina <= TOTAL_PAGINAS; pagina++) {
    console.log(`Buscando página ${pagina} de ${TOTAL_PAGINAS}...`);

    const response = await fetch(
      `https://api.jikan.moe/v4/top/manga?page=${pagina}&limit=25`,
      {
        headers: { "User-Agent": "MangaParadise/1.0" },
      },
    );

    if (!response.ok) {
      console.warn(
        `Erro na página ${pagina}: Status ${response.status}. Pulando...`,
      );
      continue;
    }

    const json = await response.json();

    if (json.data && Array.isArray(json.data)) {
      todosMangas = todosMangas.concat(json.data as MALManga[]);
    }

    if (pagina < TOTAL_PAGINAS) {
      await sleep(1000);
    }
  }

  console.log(
    `Total de ${todosMangas.length} mangás obtidos! Salvando no banco...`,
  );

  //loop pra gravar no banco
  for (const manga of todosMangas) {
    const autorNome = manga.authors?.[0]?.name || "Autor Desconhecido";
    const anoLancamento = manga.published?.from
      ? new Date(manga.published.from).getFullYear()
      : 2026;
    const precoAleatorio = Math.floor(Math.random() * 31) + 29 + 0.9;

    await prisma.produto.create({
      data: {
        titulo: manga.title_english || manga.title,
        descricao: manga.synopsis || "Sem descrição disponível.",
        preco: precoAleatorio,
        volume: manga.volumes || 1,
        autor: autorNome,
        ano: anoLancamento,
        imagem:
          manga.images?.jpg?.large_image_url ||
          manga.images?.jpg?.image_url ||
          "https://via.placeholder.com/300x450?text=Sem+Capa",
        estoque: Math.floor(Math.random() * 50) + 10,
        genero: mapearGenero(manga.genres || []),
        demografia: mapearDemografia(manga.demographics || []),
      },
    });

    console.log(`Adicionado: ${manga.title}`);
  }

  console.log("Banco de dados povoado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro durante a execução do seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

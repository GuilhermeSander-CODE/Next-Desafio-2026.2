export async function buscarMangaJikan(termo: string) {
    try {
        const isId = /^\d+$/.test(termo.trim());
        const endpoint = isId 
            ? `https://api.jikan.moe/v4/manga/${termo.trim()}`
            : `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(termo)}&limit=1`;

        const res = await fetch(endpoint);
        if (!res.ok) return null;

        const data = await res.json();
        const manga = isId ? data.data : data.data?.[0];

        if (!manga) return null;

        return {
            titulo: manga.title || "",
            descricao: manga.synopsis || "",
            imagem: manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url || "",
            autor: manga.authors?.[0]?.name || "Autor Desconhecido",
            ano: manga.published?.prop?.from?.year || new Date().getFullYear(),
            genero: manga.genres?.[0]?.name || "Outros",
            demografia: manga.demographics?.[0]?.name?.toUpperCase() || "SHOUNEN",
            volume: manga.volumes || 1,
        };
    } 
    catch (error) {
        console.error("Erro ao buscar no Jikan/MAL:", error);
        return null;
    }
}
import CarrosselManga from "@/components/carrossel-mangas";
import Catalogo from "@/components/catalogo-produtos";
import HeroSection from "@/components/hero-section";
import SobreNos from "@/components/secao-sobre";

export default function Home() {
  return (
    <div className="w-full md:p-0 min-h-screen bg-[url('/Fundo-principal.png')] bg-center bg-cover bg-fixed bg-no-repeat">
      <HeroSection />
      <CarrosselManga  
        mangas={[
          { id: 1, titulo: "Frieren", descricao: "...", preco: "R$ 34,90", img: "capas/Capa-default-1.png" },
          { id: 2, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 3, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 4, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 5, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 6, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 7, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 8, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 9, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" }
        ]}
      />
      <SobreNos />
      <Catalogo 
        mangas={[
          { id: 1, titulo: "Frieren", descricao: "...", preco: "R$ 34,90", img: "capas/Capa-default-1.png" },
          { id: 2, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 3, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 4, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 5, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 6, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 7, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 8, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" },
          { id: 9, titulo: "Witch Hat Atelier", descricao: "...", preco: "R$ 29,90", img: "capas/Capa-default-2.png" }
        ]}
      />
      
    </div>
  );
}

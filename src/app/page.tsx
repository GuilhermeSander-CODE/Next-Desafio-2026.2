import CarrosselManga from "@/components/carrossel-mangas";
import Catalogo from "@/components/catalogo-produtos";
import HeroSection from "@/components/hero-section";
import SobreNos from "@/components/secao-sobre";
import { getMaisVendidos } from "@/utils/mangas";

export default async function Home() {
  const mangasMaisVendidos = await getMaisVendidos();

  return (
    <div className="w-full md:p-0 min-h-screen bg-[url('/Fundo-principal.png')] bg-center bg-cover bg-fixed bg-no-repeat">
      <HeroSection />
      <CarrosselManga  mangas={mangasMaisVendidos}/>
      <SobreNos />
      <Catalogo mangas={mangasMaisVendidos}/>
      
    </div>
  );
}

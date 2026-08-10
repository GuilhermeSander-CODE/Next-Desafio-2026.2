import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MangaCard, { Manga } from "@/components/card-manga"

type MangaGridProps = {
  mangas: Manga[];
};

export default function Catalogo({mangas }: MangaGridProps){
    return(
        <div className="w-full space-y-12 py-7">
            <div className="flex flex-col md:flex-row items-center justify-center  w-full md:justify-between mb-6 py-6 px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black tracking-wide">
                    Veja nosso catalogo
                </h2>
                <Link href={'/produtos'} className="shrink-0" >
                    <span className='text-base xl:text-2xl 2xl:text-3xl text-electric-violet
                    hover:bg-white/20 p-2 rounded-xl  flex flex-row items-center justify-center whitespace-nowrap transition-colors'>
                        Veja mais produtos <ArrowRight />
                    </span>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
                {mangas.map((manga) => (
                    <MangaCard
                        key={manga.id}
                        manga={manga}
                        className="w-full max-w-55 h-72 sm:h-80"
                    />
                ))}
            </div>

        </div>
    )
}
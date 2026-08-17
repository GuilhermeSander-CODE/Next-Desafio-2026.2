'use client'

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MangaCard, { Manga } from "@/components/card-manga"

type MangaCarrosselProps = {
  mangas: Manga[];
};

export default function CarrosselManga({ mangas = []}: MangaCarrosselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    if (!mangas || mangas.length === 0) {
        return (
            <div className="w-full py-8 text-center text-gray-500">
                Nenhum mangá disponível no momento.
            </div>
        );
    }

    return (

        <section className="w-full py-8 relative overflow-hidden ">
            <div className="flex items-center w-full justify-center mb-6 px-2">
                <h2 className="text-2xl md:text-3xl font-bold text-black tracking-wide">
                    Mais Vendidos
                </h2>
            </div>

            <div className="relative group/carousel">
                <button
                    onClick={scrollLeft}
                    aria-label="Rolar para esquerda"
                    className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-piano-black/90 hover:bg-electric-violet border border-white/20 text-white p-3 rounded-full shadow-2xl backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div
                    ref={carouselRef}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-2 scroll-smooth"
                >
                    {mangas.map((manga) => (
                        <MangaCard
                            key={manga.id}
                            manga={manga}
                            className="w-44 sm:w-52 h-72 sm:h-80 shrink-0 snap-start"
                        />
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    aria-label="Rolar para direita"
                    className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-piano-black/90 hover:bg-electric-violet border border-white/20 text-white p-3 rounded-full shadow-2xl backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

            </div>
        </section>
    );
}
'use client'

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export type Manga = {
  id: number | string;
  titulo: string;
  descricao: string;
  preco: string;
  img: string;
  href?: string;
};

type MangaCardProps = {
  manga: Manga;
  className?: string;
};

export default function MangaCard({ manga, className = "w-48 h-72" }: MangaCardProps) {
    return (
        <div className={`group relative rounded-2xl overflow-hidden bg-white p-1.5 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/40 cursor-pointer ${className}`}>
     
            <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                    src={manga.img}
                    alt={manga.titulo}
                    fill
                    unoptimized
                    loading="eager"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                
                <div className="absolute inset-0 bg-black/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between items-center text-center text-white">
                    <h3 className="font-alkalami text-2xl font-bold tracking-wide text-white mt-1">
                        {manga.titulo}
                    </h3>
                    <p className="text-[11px] text-gray-300 line-clamp-4 leading-relaxed px-1">
                        {manga.descricao}
                    </p>
                    <div className="w-full flex items-center justify-between px-2 my-1">
                        <span className="text-lg font-bold text-white">
                            {manga.preco}
                        </span>

                        <button aria-label="Adicionar ao carrinho" className="bg-persian-red hover:bg-red-700 text-white p-2.5 rounded-xl transition-transform active:scale-95 shadow-md">
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                    </div>

                    
                    <Link 
                        href={manga.href || `/produtos/${manga.id}`} 
                        className="w-full border border-white/80 hover:bg-white hover:text-black text-white text-xs font-semibold py-1.5 rounded-lg transition-all text-center"
                    >
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}
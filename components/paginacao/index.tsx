'use client'

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginacaoProps {
    totalPaginas: number;
    paginaAtual: number;
    className?: string; 
}

function gerarRangePaginas(paginaAtual: number, totalPaginas: number) {
    const delta = 1; // Quantas páginas mostrar antes e depois da atual
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPaginas; i++) {
        if (
            i === 1 || // Sempre mostra a primeira
            i === totalPaginas || // Sempre mostra a última
            (i >= paginaAtual - delta && i <= paginaAtual + delta) // Mostra vizinhas da atual
        ) 
        {
            range.push(i);
        } 
        else if (range[range.length - 1] !== "...") 
        {
            range.push("...");
        }
    }

    return range;
}

export default function Paginacao({totalPaginas, paginaAtual, className = ""}: PaginacaoProps){
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPaginas <= 1) return null;

    const criarLinkPagina = (novaPagina: number) => {
        
        const params = new URLSearchParams(searchParams.toString());
        
        params.set("pagina", novaPagina.toString());
       
        return `${pathname}?${params.toString()}`;
    };

    const listaPaginas = gerarRangePaginas(paginaAtual, totalPaginas);

    const baseLinkClasses = "w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-lg sm:rounded-xl flex items-center justify-center border transition-all duration-300 shadow-sm shrink-0";
    const activeClasses = "bg-piano-black text-white border-black hover:bg-black scale-105 font-bold"; 
    const inactiveClasses = "bg-white border-quiet-gray text-gray-800 hover:bg-gray-100 hover:border-gray-300"; 
    const disabledClasses = "bg-gray-100 border-gray-200 text-gray-300 opacity-60 cursor-not-allowed";
    
    return (
        <div className={`flex justify-center ${className}`}>
            <nav aria-label="Navegação de página" className="flex items-center gap-2.5">
                
                
                {paginaAtual > 1 ? 
                    (
                        <Link
                            href={criarLinkPagina(paginaAtual - 1)}
                            className={`${baseLinkClasses} ${inactiveClasses} active:scale-95`}
                            aria-label="Página anterior"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                    ) 
                    : 
                    (
                        <button disabled className={`${baseLinkClasses} ${disabledClasses}`} aria-label="Página anterior desabilitada">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )
                }

                
                {listaPaginas.map((item, index) => {
                    if (item === "...") {
                        return (
                            <span key={`dots-${index}`} className="w-6 flex items-center justify-center text-gray-400 font-bold select-none">
                                ...
                            </span>
                        );
                    }

                    const numPagina = Number(item);
                    const isAtual = numPagina === paginaAtual;

                    return (
                        <Link
                            key={numPagina}
                            href={criarLinkPagina(numPagina)}
                            className={`${baseLinkClasses} text-sm font-semibold ${isAtual ? activeClasses : inactiveClasses}`}
                        >
                            {numPagina}
                        </Link>
                    );
                })}

                {paginaAtual < totalPaginas ? 
                    (
                        <Link
                            href={criarLinkPagina(paginaAtual + 1)}
                            className={`${baseLinkClasses} ${inactiveClasses} active:scale-95`}
                            aria-label="Próxima página"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    ) 
                    : 
                    (
                        <button disabled className={`${baseLinkClasses} ${disabledClasses}`} aria-label="Próxima página desabilitada">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )
                }
            </nav>
        </div>
    );

}
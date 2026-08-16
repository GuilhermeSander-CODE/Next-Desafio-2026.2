import MangaCard from "@/components/card-manga";
import SearchBar from "@/components/search"; 
import { getProdutosPaginados, FiltroProdutos } from "@/utils/catalogo-manga";
import { Genero, Demografia } from "@/generated/prisma/enums";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic ='force-dynamic'


type Props = {
    searchParams: Promise <{
         q?: string;
        genero?: Genero;
        demografia?: Demografia;
        minPreco?: string;
        maxPreco?: string;
        pagina?: string;
    }>;
};

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

export default async function PaginaDeProdutos({searchParams}:Props) {
    const params = await searchParams;
    
    const filtros: FiltroProdutos = {
        q: params.q,
        genero: params.genero,
        demografia: params.demografia,
        minPreco: params.minPreco ? Number(params.minPreco): undefined,
        maxPreco: params.maxPreco ? Number(params.maxPreco): undefined,
        pagina: Number(params.pagina) || 1,
        limite: 15,
    };

    const {mangas, totalPaginas, paginaAtual} = await getProdutosPaginados(filtros);

    const criarLinkPagina = (novaPagina: number) => {
        const newParams = new URLSearchParams();
        if (params.q) newParams.set("q", params.q);
        if (params.genero) newParams.set("genero", params.genero);
        if (params.demografia) newParams.set("demografia", params.demografia);
        if (params.minPreco) newParams.set("minPreco", params.minPreco);
        if (params.maxPreco) newParams.set("maxPreco", params.maxPreco);

        newParams.set("pagina", novaPagina.toString());
        return `/produtos?${newParams.toString()}`;
    };

    const listaPaginas = gerarRangePaginas(paginaAtual, totalPaginas);
    
    return(
        <main className="w-full md:p-0 min-h-screen bg-[url('/Fundo-principal.png')] bg-center bg-cover bg-fixed bg-no-repeat">
            <SearchBar />
            {mangas.length > 0 ? 
                (

                    <div className="grid grid-cols-1 pb-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
                        {mangas.map((manga) => (
                            <MangaCard
                                key={manga.id}
                                manga={manga}
                                className="w-full max-w-55 h-72 sm:h-80"
                            />
                        ))}
                    </div> 
                )
                :
                (
                    <div className="text-center py-16 text-gray-500">
                        Nunhum mangá encontrado com os filtros selecionados.
                    </div>
                )
            }

            {totalPaginas > 1 && (
                <div className="flex justify-center p-6">
                    <nav 
                        aria-label="Navegação de página"
                        className="flex items-center gap-3"
                    >
                        {paginaAtual > 1 ? 
                            (
                                <Link
                                    href={criarLinkPagina(paginaAtual - 1)}
                                    className=" w-10 h-10 rounded-xl flex items-center justify-center bg-white/40 backdrop-blur-md
                                    border border-quiet-gray text-black hover:bg-piano-black hover:text-white hover:border-black
                                    transition-all duration-300 shadow-sm active:scale-95 "
                                    aria-label="Página anterior"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Link>
                            ) 
                            : 
                            (
                                <button
                                    disabled
                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-xs border border-gray-200/50  text-gray-400 opacity-40 cursor-not-allowed"
                                    aria-label="Página anterior desabilitada"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            )
                        }

            
                        
                        {listaPaginas.map((item, index) => {
                            if (item === "...") {
                                return (
                                    <span key={`dots-${index}`}
                                    className="w-8 flex items-center justify-center text-gray-500 font-bold select-none">
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
                                    className={`w-12 h-12w-10 h-10 rounded-xl flex items-center justify-center  text-md font-semibold backdrop-blur-md transition-all duration-200 
                                        ${isAtual
                                            ? "bg-piano-black text-white border border-black shadow-lg scale-105"
                                            : "bg-white/40 border border-quiet-gray text-gray-800  hover:bg-black hover:text-white hover:border-black shadow-sm"
                                        }
                                    `}
                                >
                                    {numPagina}
                                </Link>
                            );
                        })}
        
                        {paginaAtual < totalPaginas ? 
                            (
                                <Link
                                    href={criarLinkPagina(paginaAtual + 1)}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/40 backdrop-blur-md
                                    border border-quiet-gray text-black hover:bg-piano-black hover:text-white hover:border-black
                                    transition-all duration-300 shadow-sm active:scale-95 "                                    
                                    aria-label="Próxima página"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            ) 
                            : 
                            (
                                <button
                                    disabled
                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-xs border border-gray-200/50  text-gray-400 opacity-40 cursor-not-allowed"
                                    aria-label="Próxima página desabilitada"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )
                        }
                    </nav>
                </div>
            )}
        </main>
    )
}


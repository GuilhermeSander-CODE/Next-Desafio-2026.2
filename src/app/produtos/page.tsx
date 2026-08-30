import MangaCard from "@/components/card-manga";
import SearchBar from "@/components/search"; 
import { getProdutosPaginados, FiltroProdutos } from "@/utils/mangas-paginados";
import { Genero, Demografia } from "@/generated/prisma/enums";
import Paginacao from "@/components/paginacao";

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

            <Paginacao 
                totalPaginas={totalPaginas} 
                paginaAtual={paginaAtual}
                className="p-6" 
            />
        </main>
    )
}


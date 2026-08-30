import Paginacao from "@/components/paginacao";
import TabelaGerenciamento from "@/components/tabela-admin";
import { prisma } from "@/src/lib/prisma";


interface PaginaGerenciamentoProps{
    searchParams: Promise<{
        busca?: string;
        pagina?: string;
    }>;
}



export default async function PaginaGerenciamento({ searchParams }: PaginaGerenciamentoProps) {
    const params = await searchParams;
    const termoBusca = params.busca || "";

    const paginaAtual = Number(params.pagina) || 1;
    const limitePorPagina = 7; 
    const skip = (paginaAtual - 1) * limitePorPagina;

    const whereCondition = {
        titulo: {
            contains: termoBusca,
            mode: "insensitive" as const,
        },
    };

    const [produtosBanco, totalProdutos] = await Promise.all([
        prisma.produto.findMany({
            where: whereCondition,
            take: limitePorPagina, 
            skip: skip,            
            orderBy: { createdAt: "desc" },
        }),
        prisma.produto.count({
            where: whereCondition, 
        }),
    ]);

    const produtosFormatados = produtosBanco.map((produto) => ({
        ...produto,
        preco: Number(produto.preco),
    }));

    const totalPaginas = Math.ceil(totalProdutos / limitePorPagina) || 1;
    

    return(
        <div className="w-full md:p-0 min-h-screen">
            <div className="w-full justify-center items-center p-4">

                <h1 className="text-2xl md:text-3xl font-extrabold text-black 
                text-center mb-8 tracking-tight">
                    Gerenciamento de Produto
                </h1>

                <div className="border-b border-quiet-gray/40 w-full"></div>
            </div>

            <div className="bg-white backdrop-blur-sm rounded-2xl p-4 sm:p-6 
            border border-gray-300/80 shadow-sm w-full max-w-6xl mx-auto">

                <TabelaGerenciamento 
                    produtos={produtosFormatados}
                    termoBusca={termoBusca}
                />

                

                <div className="mt-6 pt-4 border-t border-gray-200/60">
                    <Paginacao 
                        totalPaginas={totalPaginas}
                        paginaAtual={paginaAtual}
                    />
                </div>
            </div>
        </div>
    );
}
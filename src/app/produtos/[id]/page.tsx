import { getMangaPorID } from "@/utils/manga-por-id";
import { notFound } from "next/navigation";
import Image from "next/image";
import SecaoDeCompra from "@/components/secao-de-compra";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PaginaIndividual({ params }: Props) {
  const { id } = await params;

  const manga = await getMangaPorID(id);

  if (!manga) notFound();

  const precoFormatado = manga.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main className="w-full items-center justify-center md:p-0 min-h-screen text-black py-10 px-4 sm:px-8 bg-titanium-white">
        <div className="w-full p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-between">
           
            <div className="w-full max-w-125 h-95 sm:h-127.5 bg-white border border-gray-200 shadow-md rounded-2xl p-4 flex items-center justify-center mx-auto relative">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                    src={manga.imagem}
                    alt={manga.titulo}
                    fill
                    unoptimized
                    loading="eager"
                    className="object-contain"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full justify-between h-full">
                <h1 className="font-alkalami text-3xl md:text-4xl font-bold tracking-wide text-black">
                    {manga.titulo}
                </h1>

                <div>
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Sinopse
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
                        {manga.descricao || "Sem descrição disponível."}
                    </p>
                </div>

                <div className="w-full border-b border-new-gray my-1 "></div>

                <div className="my-2">
                    <span className="text-sm text-gray-500 block">Preço</span>
                    <span className="text-3xl md:text-4xl font-extrabold text-black">
                        {precoFormatado}
                    </span>
                </div>

               <SecaoDeCompra 
                    produto={{
                        id: manga.id,
                        titulo:  manga.titulo,
                        preco: Number( manga.preco),
                        imagem:  manga.imagem,
                        estoque: manga.estoque,
                    }} 
                />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 py-6">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 font-semibold block uppercase">
                    Volume
                </span>
                <p className="text-base font-bold text-black">{manga.volume}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 font-semibold block uppercase">
                    Autor
                </span>
                <p className="text-base font-bold text-black">{manga.autor}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 font-semibold block uppercase">
                    Ano de Lançamento
                </span>
                <p className="text-base font-bold text-black">{manga.ano}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 font-semibold block uppercase">
                    Gênero
                </span>
                <p className="text-base font-bold text-black">{manga.genero}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 font-semibold block uppercase">
                    Demografia
                </span>
                <p className="text-base font-bold text-black">{manga.demografia}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-500 font-semibold block uppercase">
                    Disponibilidade
                </span>
                <p className="text-base font-bold text-black">
                    {manga.estoque > 0 ? `${manga.estoque} em estoque` : "Esgotado"}
                </p>
            </div>
        </div>
    </main>
  );
}

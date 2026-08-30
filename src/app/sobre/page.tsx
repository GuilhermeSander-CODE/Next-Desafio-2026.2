import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "Sobre Nós | Paraíso do Mangá",
    description: "Conheça a história e os valores do Paraíso do Mangá, a sua loja definitiva de mangás no Brasil.",
};

export default function PaginaSobre() {
    return (
        <main className="min-h-screen bg-[url('/Fundo-principal.png')] bg-center bg-cover bg-fixed bg-no-repeat text-black px-4 py-12 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto space-y-12">
                
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-electric-violet bg-piano-black p-2.5 px-4 rounded-full transition-all hover:bg-black/20 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 text-electric-violet" />
                        Voltar para a Home
                    </Link>
                </div>

                <header className="space-y-4 border-b border-quiet-gray pb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-electric-violet">
                        Paraíso do Mangá
                    </h1>
                    <p className="text-lg text-gray-800">
                        O seu refúgio definitivo para histórias extraordinárias e coleções inesquecíveis.
                    </p>
                </header>

                <section className="space-y-8 text-gray-700 leading-relaxed text-base sm:text-lg">
                    <p>
                        Fundado por apaixonados pela cultura pop japonesa, o <strong className="text-black">Paraíso do Mangá</strong> nasceu com um propósito simples, porém ambicioso: conectar colecionadores e novos leitores às melhores obras e edições de mangás do mercado.
                    </p>

                    <p>
                        Acreditamos que cada volume não é apenas papel impresso, mas sim uma porta de entrada para novos mundos, lições de vida, batalhas épicas e emoções profundas. Por isso, nosso compromisso vai além de vender livros — nós cuidamos de cada pedido com o carinho que um colecionador merece, desde a embalagem reforçada até a entrega na sua porta.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                        <div className="bg-piano-black border border-quiet-gray p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                            <BookOpen className="w-8 h-8 text-electric-violet" />
                            <h3 className="text-white font-bold text-xl">Acervo Curado</h3>
                            <p className="text-sm text-gray-400">Desde os grandes clássicos Shonen e Seinen até os últimos lançamentos do mercado.</p>
                        </div>

                        <div className="bg-piano-black border border-quiet-gray p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                            <Heart className="w-8 h-8 text-electric-violet" />
                            <h3 className="text-white font-bold text-xl">De Fã para Fã</h3>
                            <p className="text-sm text-gray-400">Entendemos a exigência do colecionador e priorizamos a integridade física de cada volume.</p>
                        </div>

                        <div className="bg-piano-black border border-quiet-gray p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                            <ShieldCheck className="w-8 h-8 text-electric-violet" />
                            <h3 className="text-white font-bold text-xl">Envio Seguro</h3>
                            <p className="text-sm text-gray-400">Embalagens ultra-protegidas contra amassados para garantir que seu mangá chegue impecável.</p>
                        </div>
                    </div>

                    <p>
                        Seja você um colecionador veterano com estantes lotadas ou alguém lendo seu primeiro volume, o <strong className="text-black">Paraíso do Mangá</strong> é o seu lugar. Explore nosso catálogo e viva a magia da leitura conosco!
                    </p>
                </section>
            </div>
        </main>
    );
}
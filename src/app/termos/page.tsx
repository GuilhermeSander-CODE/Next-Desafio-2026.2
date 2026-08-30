import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Termos de Uso | Paraíso do Mangá",
    description: "Conheça os termos e condições de uso da plataforma Paraíso do Mangá.",
};

export default function PaginaTermos() {
    return (
        <main className="min-h-screen bg-[url('/Fundo-principal.png')] bg-center bg-cover bg-fixed bg-no-repeat text-black px-4 py-12 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto space-y-10">
                
                <div>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-electric-violet bg-piano-black p-2.5 px-4 rounded-full transition-all hover:bg-black/20 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 text-electric-violet" />
                        Voltar para a Home
                    </Link>
                </div>

                <header className="space-y-3 border-b border-quiet-gray pb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-black">
                        Termos de Uso
                    </h1>
                    <p className="text-sm text-gray-800">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </header>

                <section className="space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e realizar compras na plataforma <strong>Paraíso do Mangá</strong>, você concorda expressamente em cumprir estes Termos de Uso, bem como todas as leis e regulamentos aplicáveis. Caso não concorde com qualquer um dos termos, recomendamos que interrompa o uso do site.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">2. Cadastro e Responsabilidade da Conta</h2>
                        <p>
                            Para realizar compras ou gerenciar seus pedidos, pode ser necessário criar uma conta. Você é o único responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrerem em sua conta. Informações falsas ou incompletas sujeitam o cadastro ao cancelamento.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">3. Pedidos, Preços e Disponibilidade de Estoque</h2>
                        <p>
                            Nos esforçamos para manter todas as informações de preço e estoque atualizadas em tempo real. No entanto, reservamo-nos o direito de corrigir erros de digitação e cancelar pedidos decorrentes de falhas sistêmicas no inventário ou divergências expressivas de valor.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">4. Entregas e Envio</h2>
                        <p>
                            Os prazos de entrega informados durante a compra são estimativas calculadas pelas transportadoras parceiras. O Paraíso do Mangá não se responsabiliza por atrasos decorrentes de greves, intempéries climáticas ou falhas na prestação dos serviços postais após a postagem.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">5. Propriedade Intelectual</h2>
                        <p>
                            Todo o conteúdo visual, logotipo, layout e estrutura do e-commerce pertencem ao <strong>Paraíso do Mangá</strong>. As capas, marcas e obras comercializadas são de propriedade intelectual exclusiva de suas respectivas editoras e autores licenciados.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">6. Alterações nos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações entrarão em vigor imediatamente após a sua publicação no site.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Política de Privacidade | Paraíso do Mangá",
    description: "Saiba como o Paraíso do Mangá coleta, armazena e protege seus dados pessoais.",
};

export default function PaginaPrivacidade() {
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
                        Política de Privacidade
                    </h1>
                    <p className="text-sm text-gray-800">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                </header>

                <section className="space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">1. Informações que Coletamos</h2>
                        <p>
                            Para processar seus pedidos e garantir a melhor experiência de compra no <strong>Paraíso do Mangá</strong>, coletamos as seguintes informações fornecidas diretamente por você:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li><strong>Dados cadastrais:</strong> Nome completo, e-mail e senha cadastrada.</li>
                            <li><strong>Dados de entrega:</strong> Endereço de cobrança e endereço de envio dos mangás.</li>
                            <li><strong>Histórico de compras:</strong> Itens adicionados ao carrinho e lista de pedidos realizados.</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">2. Como Utilizamos Seus Dados</h2>
                        <p>
                            Seus dados pessoais são utilizados estritamente para:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Processar a compra e emitir as informações fiscais do seu pedido.</li>
                            <li>Enviar atualizações sobre o status de entrega do seu pacote.</li>
                            <li>Autenticar seu acesso seguro às rotas administrativas ou de usuário.</li>
                            <li>Atender a solicitações de suporte ao cliente.</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">3. Compartilhamento de Informações com Terceiros</h2>
                        <p>
                            O <strong>Paraíso do Mangá</strong> não vende e nem aluga seus dados pessoais. O compartilhamento ocorre exclusivamente com parceiros essenciais para a operação da loja, tais como:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li><strong>Gateways de pagamento:</strong> Para validação segura do pagamento.</li>
                            <li><strong>Empresas de Logística/Transportadoras:</strong> Para que seu pacote chegue ao endereço correto.</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">4. Armazenamento e Segurança dos Dados</h2>
                        <p>
                            Empregamos medidas técnicas avançadas, como conexões criptografadas (HTTPS/SSL), hash de senhas e banco de dados protegido para prevenir acessos não autorizados, perdas ou alterações dos seus dados.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-black">5. Seus Direitos (LGPD)</h2>
                        <p>
                            Conforme previsto pela Lei Geral de Proteção de Dados (LGPD), você possui o direito de solicitar o acesso, correção, anonimização ou exclusão definitiva dos seus dados pessoais cadastrados em nossa base de dados a qualquer momento.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Truck } from "lucide-react";
import SeletorQuantidade from "@/components/seletor-de-quantidade";
import { useCart } from "@/src/context/CartContext";

export default function PaginaCarrinho(){
    const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
    const [cep, setCep] = useState("");
    const [frete, setFrete] = useState<number | null>(null);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.preco * item.quantity,
        0
    );

    const total = subtotal + (frete || 0);
    const totalItens = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleCalcularFrete = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cep.trim()) return;

        // Simulação de cálculo de frete
        setFrete(15.0);
    };

    return(
        <main className="min-h-screen bg-titanium-white py-8 px-4 sm:px-8 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" >
                <section className="lg:col-span-7 bg-titanium-white rounded-2xl p-6 shadow-sm border border-gray-300/60">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-2xl font-bold text-black tracking-tight">Produtos</h1>
                            <span className="text-sm text-gray-500 font-medium">
                                {totalItens} {totalItens === 1 ? "produto" : "produtos"}
                            </span>
                        </div>

                        {cartItems.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="text-xs font-semibold text-gray-600 hover:text-red-600 bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                                Limpar carrinho
                            </button>
                        )}
                    </div>

                    <div className="divide-y divide-gray-200 my-4">
                        {cartItems.length === 0 ? 
                            (
                                <div className="py-16 text-center">
                                    <p className="text-gray-500 font-medium text-lg">
                                        Seu carrinho está vazio.
                                    </p>
                                    <Link
                                        href="/produtos"
                                        className="inline-block mt-4 text-sm font-semibold text-electric-violet hover:underline"
                                    >
                                        Voltar para a loja
                                    </Link>
                                </div>
                            ) 
                            : 
                            (
                                cartItems.map((item) => {
                                    const itemSubtotal = item.preco * item.quantity;

                                    return (
                                        <div
                                            key={item.product_id}
                                            className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-4 w-full sm:flex-1 min-w-0">
                                                <div className="relative w-20 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-300">
                                                    <Image
                                                    src={item.imagem}
                                                    alt={item.titulo}
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold line-clamp-2 text-gray-900 font-alkalami text-base wrap-break-words">
                                                        {item.titulo}
                                                    </h3>
                                                    <div className="flex gap-8 mt-4 text-xs text-gray-500">
                                                        <div>
                                                            <p>Preço Unitário</p>
                                                            <p className="font-bold text-gray-800 text-sm mt-0.5">
                                                                R$ {item.preco.toFixed(2).replace(".", ",")}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>Subtotal</p>
                                                            <p className="font-bold text-gray-800 text-sm mt-0.5">
                                                                R$ {itemSubtotal.toFixed(2).replace(".", ",")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center shrink-0  justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0">
                                                <SeletorQuantidade
                                                    quantidade={item.quantity}
                                                    onChange={(novaQtd) =>
                                                        updateQuantity(item.product_id, novaQtd)
                                                    }
                                                />

                                                <button
                                                    onClick={() => removeItem(item.product_id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                                                    aria-label="Remover produto"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )
                        }
                    </div>
                </section>
                
                <section className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-300/60">
                    <h2 className="text-xl font-bold text-black mb-3">Resumo do Pedido</h2>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id metus porta, fermentum arcu id, porta dui. In grida, helit nec finibus scelerisque, nisl mi tincidunt enim, eu convallis est enim id massa.
                    </p>

                    <form onSubmit={handleCalcularFrete} className="mb-6">
                        <label className="block text-xs font-semibold text-gray-700 mb-2">
                            Calcular Frete
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Truck className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Calcular frete"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    className="w-full bg-gray-200 border-none rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-black hover:bg-zinc-800 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
                            >
                                Calcular
                            </button>
                        </div>
                    </form>

                    <div className="space-y-3 py-4 border-t border-gray-200 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-800">
                                R$ {subtotal.toFixed(2).replace(".", ",")}
                            </span>
                        </div>

                        {frete !== null && (
                            <div className="flex justify-between text-gray-500">
                                <span>Frete</span>
                                <span className="font-semibold text-gray-800">
                                    R$ {frete.toFixed(2).replace(".", ",")}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-2 text-base font-bold">
                            <span className="text-gray-700">Total a Pagar</span>
                            <span className="text-emerald-600 text-lg">
                                R$ {total.toFixed(2).replace(".", ",")}
                            </span>
                        </div>  
                    </div>

                    <div className="space-y-2 mt-6">
                        <button
                            disabled={cartItems.length === 0}
                            className="w-full bg-piano-black hover:bg-black disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer"
                        >
                            Finalizar Compra
                        </button>

                        <Link
                            href="/produtos"
                            className="w-full block text-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.99]"
                        >
                            Continuar Comprando
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    )
}
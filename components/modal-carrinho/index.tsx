'use client'

import Link from "next/link";
import Image from "next/image";
import { Trash2, X } from "lucide-react";
import SeletorQuantidade from "../seletor-de-quantidade";
import { useCart } from "@/src/context/CartContext";


export default function ModalCarrinho (){
    const { isModalOpen, setIsModalOpen, cartItems, updateQuantity, removeItem } = useCart();

    if (!isModalOpen) return null;

    const total = cartItems.reduce((acc, item) => {
        return acc + item.preco * item.quantity;
    }, 0);

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 md:p-4">
            <div className="w-full max-w-lg rounded-2xl bg-titanium-white text-black shadow-2xl p-4 md:p-6 transition-all animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-gray-300 shrink-0">
                    <h2 className="text-lg md:text-xl font-bold tracking-tight">Carrinho</h2>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-1 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto my-3 md:my-4 pr-1 space-y-3 flex-1">
                    {cartItems.length === 0 ? 
                        (
                            <p className="text-center py-8 text-gray-500 font-medium">
                                Seu carrinho está vazio.
                            </p>
                        )
                        :
                        (
                            cartItems.map((item) => {
                                return(
                                    <div
                                        key={item.id}
                                        className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-200/80 gap-3"
                                    >
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="relative w-14 h-18 md:w-16 md:h-20 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200">
                                                { item?.imagem? 
                                                    (
                                                        <Image 
                                                            src={item.imagem}
                                                            alt={item.titulo || "Mangá"}
                                                            fill
                                                            unoptimized
                                                            loading="eager"
                                                            className="object-cover"
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <div className="w-full h-full bg-gray-300 animate-pulse" />
                                                    )
                                                }
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold font-alkalami text-sm text-gray-900 truncate">
                                                    {item.titulo}
                                                </h3>
                                                <p className="text-[11px] md:text-xs text-gray-500 mt-0.5">Preço Unitário</p>
                                                <p className="text-xs md:text-sm font-bold text-gray-800">
                                                    R$ {item.preco.toFixed(2).replace('.', ',')}
                                                </p>
                                            </div>
                                            
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="md:hidden p-1.5 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                                                aria-label="Remover item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        

                                        <div className="flex items-center justify-between md:justify-end gap-2 pt-2 md:pt-0 border-t border-gray-100 md:border-t-0">
                                            <SeletorQuantidade
                                                quantidade={Number(item.quantity)}
                                                onChange={(novaQtd) => updateQuantity(item.id, novaQtd)}
                                            />

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="hidden md:block p-2 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                                                aria-label="Remover item"
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

                <div className="pt-3 md:pt-4 border-t border-gray-300 shrink-0">
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                        <span className="text-xs md:text-sm font-medium text-gray-700">Total a Pagar</span>
                        <span className="text-lg md:text-xl font-bold text-emerald-600">
                            R$ {total.toFixed(2).replace('.', ',')}
                        </span>
                    </div>

                    <Link
                        href="/carrinho"
                        onClick={() => setIsModalOpen(false)}
                        className="w-full block text-center bg-piano-black hover:bg-black text-white font-semibold py-2.5 md:py-3 text-sm md:text-base rounded-xl transition-all shadow-md active:scale-[0.99]"
                    >
                        Ir para o carrinho
                    </Link>
                </div>
            </div>
        </div>
    );
}
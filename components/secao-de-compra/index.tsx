'use client'

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import SeletorQuantidade from "@/components/seletor-de-quantidade";
import { useCart } from "@/src/context/CartContext";

type Props = {
    produto: {
        id: string;
        titulo: string;
        preco: number;
        imagem: string;
        estoque: number;
    };
};

export default function SecaoDeCompra({ produto }: Props) {
    const [quantidade, setQuantidade] = useState(1);
    const { addItem, isLoading } = useCart();

    const handleAdicionar = () => {
        addItem(produto, quantidade);
    };

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 mt-4">
            <SeletorQuantidade 
                estoqueMaximo={produto.estoque} 
                onChange={(qtd) => setQuantidade(qtd)} 
            />

            <button
                onClick={handleAdicionar}
                disabled={isLoading || produto.estoque <= 0}
                aria-label="Adicionar ao carrinho"
                className="flex-1 bg-persian-red hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
                <ShoppingCart className="w-5 h-5" />
                <span>{isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}</span>
            </button>
        </div>
    );
}
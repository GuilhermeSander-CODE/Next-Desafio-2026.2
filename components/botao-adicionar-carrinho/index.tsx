'use client'

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/src/context/CartContext";

type Props = {
    produto: {
        id: string;
        titulo: string;
        preco: number;
        imagem: string;
    };
};

export default function BotaoAdicionarCarrinho({ produto }: Props) {
    const { addItem, isLoading } = useCart();

    const handleAdicionar = () => {
        addItem(produto, 1);
    };

    return (
        <button
            onClick={handleAdicionar}
            disabled={isLoading}
            title="Adicionar ao carrinho"
            className="bg-persian-red items-center flex flex-row gap-2 justify-center hover:opacity-90 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50 cursor-pointer"
        >
            <ShoppingCart className="w-5 h-5 text-white" />
        </button>
    );
}
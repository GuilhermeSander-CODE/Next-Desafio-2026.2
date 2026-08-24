'use client'

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

type SeletorQuantidadeProps = {
    quantidade?: number;
    estoqueMaximo?: number; 
    onChange: (quantidade: number) => void; 
};

export default function SeletorQuantidade({quantidade: quantidadeProp, estoqueMaximo = 99, onChange}: SeletorQuantidadeProps) {

    const [quantidadeLocal, setQuantidadeLocal] = useState(1);

    const isControlado = quantidadeProp !== undefined;
    const quantidadeAtual = isControlado ? quantidadeProp : quantidadeLocal;

    const alterarQuantidade = (novaQtd: number) => {
        if (!isControlado) {
            setQuantidadeLocal(novaQtd);
        }
        if (onChange) {
            onChange(novaQtd);
        }
    };

    const incrementar = () => {
        if (quantidadeAtual < estoqueMaximo) {
            alterarQuantidade(quantidadeAtual + 1);
        }
    };

    const decrementar = () => {
        if (quantidadeAtual > 1) {
            alterarQuantidade(quantidadeAtual - 1);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-white backdrop-blur-md border border-white/20 p-1.5 rounded-2xl w-fit shadow-inner">
            
            <button
                type="button"
                onClick={decrementar}
                disabled={quantidadeAtual <= 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-titanium-white text-black hover:bg-gray-50 hover:text-black transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:text-white"
                aria-label="Diminuir quantidade"
            >
                <Minus className="w-4 h-4" />
            </button>

            
            <span className="w-8 text-center text-lg font-bold text-black select-none">
                {quantidadeAtual}
            </span>

            <button
                type="button"
                onClick={incrementar}
                disabled={quantidadeAtual >= estoqueMaximo}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-titanium-white text-black hover:bg-gray-50 hover:text-black transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:text-white"
                aria-label="Aumentar quantidade"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}
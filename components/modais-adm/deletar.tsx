'use client'

import { deletarManga } from "@/src/app/actions/produto-actions";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { createPortal } from "react-dom";

interface ModalExcluirProps {
    produto: { id: string; titulo: string } | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalExcluir({ produto, isOpen, onClose }: ModalExcluirProps) {
    const [isPending, startTransition] = useTransition();
    
    if (!isOpen || !produto || typeof window === "undefined") return null;

    const handleConfirmarExclusao = () => {
        startTransition(async () => {
            const res = await deletarManga(produto.id);
            
            if (res.sucesso) {
                onClose();
            } 
            else {
                alert(res.erro || "Erro ao excluir o mangá.");
            }
        });
    };

    return createPortal(
        <div className="fixed inset-0 z-999 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-titanium-white rounded-2xl p-6 text-center shadow-xl border border-gray-300">
                <div className="flex justify-center mb-2">
                    <AlertTriangle className="w-8 h-8 text-red-600 fill-red-600/10" />
                </div>

                <h3 className="font-bold text-base text-black mb-3">
                    Excluir Produto ?
                </h3>

                <div className="border-b border-gray-300/80 mb-4 w-full"></div>

                <p className="text-xs font-semibold text-gray-800 mb-6">
                    Tem certeza que deseja excluir &quot;{produto.titulo}&quot; ? <br />
                    Esta ação é irreversível.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        type="button"
                        onClick={handleConfirmarExclusao}
                        disabled={isPending}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs font-bold py-2.5 
                        px-4 rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                    >
                        {isPending ? 
                            (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Excluindo...</span>
                                </>
                            )
                            :
                            (
                                "Confirmar"
                            )
                        }
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="flex-1 bg-white hover:bg-gray-100 disabled:opacity-50 text-gray-800 border 
                        border-gray-300 text-xs font-bold py-2.5 px-4 rounded-lg transition-colors 
                        cursor-pointer shadow-sm"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
'use client'

import { createContext, useContext, useState, ReactNode, useSyncExternalStore } from "react";

export type CartItem = {
    id: string;
    product_id: string;
    quantity: number;
    titulo: string;
    preco: number;
    imagem: string;
};

type CartContextType = {
    cartItems: CartItem[];
    isModalOpen: boolean;
    isLoading: boolean;
    setIsModalOpen: (open: boolean) => void;
    addItem: (produto: { id: string; titulo: string; preco: number; imagem: string }, quantity?: number) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const EMPTY_CART: CartItem[] = [];
let rawCartCache = "";
let cachedCartItems: CartItem[] = EMPTY_CART;

const subscribe = (callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

const getSnapshot = (): CartItem[] => {
    try {
        const localData = localStorage.getItem("carrinho_mangas");
        if (!localData) return EMPTY_CART;

        if (localData !== rawCartCache) {
            rawCartCache = localData;
            cachedCartItems = JSON.parse(localData);
        }
        return cachedCartItems;
    } catch (error) {
        console.error(error);
        return EMPTY_CART;
    }
};

const getServerSnapshot = (): CartItem[] => EMPTY_CART;

export function CartProvider({ children }: { children: ReactNode }) {

   const cartItemsFromStore = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const saveCart = (newItems: CartItem[]) => {
        if (typeof window !== "undefined") {
            const jsonString = JSON.stringify(newItems);
            rawCartCache = jsonString;
            cachedCartItems = newItems;
            localStorage.setItem("carrinho_mangas", jsonString);
            window.dispatchEvent(new Event("storage"));
        }
    };
    
    const addItem = (
        produto: { id: string; titulo: string; preco: number; imagem: string },
        quantity = 1
    ) => {
        setIsLoading(true);

        const currentItems = getSnapshot();
        const itemExistente = currentItems.find((item) => item.product_id === produto.id);

        let updatedItems: CartItem[];

        if (itemExistente) {
            updatedItems = currentItems.map((item) =>
                item.product_id === produto.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            updatedItems = [
                ...currentItems,
                {
                    id: produto.id,
                    product_id: produto.id,
                    quantity,
                    titulo: produto.titulo,
                    preco: Number(produto.preco),
                    imagem: produto.imagem,
                },
            ];
        }

        saveCart(updatedItems);
        setIsLoading(false);
        setIsModalOpen(true);
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(productId);
            return;
        }

        const currentItems = getSnapshot();
        const updatedItems = currentItems.map((item) =>
            item.product_id === productId ? { ...item, quantity: newQuantity } : item
        );

        saveCart(updatedItems);
    };

    const removeItem = (productId: string) => {
        const currentItems = getSnapshot();
        const updatedItems = currentItems.filter((item) => item.product_id !== productId);
        saveCart(updatedItems);
    };

    const clearCart = () => {
        saveCart(EMPTY_CART);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems: cartItemsFromStore,
                isModalOpen,
                isLoading,
                setIsModalOpen,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
    return context;
};
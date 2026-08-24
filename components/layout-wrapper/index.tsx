'use client'

import { usePathname } from "next/navigation"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/src/context/CartContext";

export default function LayoutWrapper({children}: {children: React.ReactNode }){
    const pathname = usePathname();

    const isAuthPage = pathname === '/login'; 

    return(
        <CartProvider>
            {!isAuthPage && <Header />}
        
            {children}
        
            {!isAuthPage && <Footer />}
        </CartProvider>
    )
}
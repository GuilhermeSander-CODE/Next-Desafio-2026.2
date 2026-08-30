'use client'

import { usePathname } from "next/navigation"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/src/context/CartContext";

export default function LayoutWrapper({children}: {children: React.ReactNode }){
    const pathname = usePathname();

    const isAuthPage = pathname === '/login';
    const isAdminPage = pathname === '/admin';

    return(
        <CartProvider>
            {!isAuthPage && !isAdminPage && <Header />}
            
            {children}
        
            {!isAuthPage && <Footer />}
        </CartProvider>
    )
}
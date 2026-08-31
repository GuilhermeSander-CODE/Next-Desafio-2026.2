'use client'

import { realizarLogoutAction } from "@/src/app/actions/auth-actions";
import { ChevronLeft, ChevronRight, Home, LogOut, Menu, Package, X, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UsuarioProps = {
    id?: number;
    name?: string;
    email?: string;
};

interface SidebarProps {
    usuario?: UsuarioProps | null;
}

export default function Sidebar({ usuario }: SidebarProps){
    const [isOpen, setIsOpen] = useState(false); 
    const [isMobileOpen, setIsMobileOpen] = useState(false); 
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await realizarLogoutAction();
        router.push("/login");
    };

    const textureStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
    };

    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/admin", label: "Produtos", icon: Package },
    ];

    return(
        <>
            <div className="w-full md:hidden p-4 relative z-40">
                <div 
                    style={textureStyle}
                    className="rounded-[20px] bg-white/40 backdrop-blur-md shadow-lg 
                    p-4 transition-all duration-300 relative"
                >
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="p-2 text-black hover:bg-black/10 rounded-xl 
                            transition-colors cursor-pointer"
                            aria-label="Abrir menu"
                        >
                            {isMobileOpen ? 
                                (
                                    <X className="w-6 h-6 stroke-[2.5]" />
                                ) 
                                : 
                                (
                                    <Menu className="w-6 h-6 stroke-[2.5]" />
                                )
                            }
                        </button>
                    </div>

                    {isMobileOpen && 
                        (
                            <nav className="absolute left-0 top-[calc(100%+8px)] w-full flex flex-col gap-2 p-4 
                            rounded-[20px] bg-white backdrop-blur-md border-2 border-quiet-gray shadow-xl z-50">
                                
                                {usuario && (
                                    <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl border border-black/10 mb-2">
                                        <div className="p-2 bg-black/10 rounded-lg">
                                            <User className="w-5 h-5 text-black" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-bold text-black truncate">{usuario.name}</span>
                                            <span className="text-xs text-gray-600 truncate">{usuario.email}</span>
                                        </div>
                                    </div>
                                )}
                                    
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`
                                                flex items-center gap-3 p-3 rounded-xl transition-colors font-semibold text-black
                                                ${isActive ? "bg-black/10" : "hover:bg-black/5"}
                                            `}
                                        >
                                            <Icon className="w-5 h-5 stroke-[2.5]" />
                                            <span className="text-sm font-bold">{item.label}</span>
                                        </Link>
                                    );  
                                })}

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-3 rounded-xl text-black hover:bg-red-500/10 cursor-pointer"
                                >
                                    <LogOut className="w-5 h-5 stroke-[2.5]" />
                                    <span className="text-sm font-bold">Sair</span>
                                </button>
                            </nav>
                        )
                    }
                </div>
            </div>


            <aside
                style={textureStyle}
                className={`
                    hidden md:flex flex-col p-2.5 justify-between
                    items-center
                    rounded-[20px] border-2 border-quiet-gray
                    bg-white/40 backdrop-blur-md shadow-lg
                    transition-all duration-300 ease-in-out shrink-0
                    md:sticky md:left-3 md:top-3 md:z-50 md:h-[calc(100vh-24px)] overflow-hidden
                    ${isOpen ? "w-52" : "w-18"}
                `}
            >
               
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-black hover:bg-black/10 rounded-xl transition-colors cursor-pointer"
                    aria-label={isOpen ? "Fechar Sidebar" : "Abrir Sidebar"}
                >
                    {isOpen ? 
                        (
                            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                        ) 
                        : 
                        (
                            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                        )
                    }
                </button>

                <nav className="flex flex-col gap-3 justify-between items-center w-full">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 p-2.5 rounded-xl transition-all font-semibold text-black w-full
                                    ${isActive ? "bg-black/10" : "hover:bg-black/5"}
                                    ${isOpen ? "justify-start px-3" : "justify-center"}
                                `}  
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon className="w-6 h-6 shrink-0 stroke-[2.5]" />
                                <span 
                                    className={`
                                        text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200
                                        ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                                    `}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                
                <div className="w-full flex flex-col gap-2 pt-2 border-t border-black/10">
                    {usuario && (
                        <div 
                        className={`flex items-center gap-2.5 p-2 rounded-xl bg-black/5 border border-black/5 w-full ${isOpen ? "px-3" : "justify-center"}`}
                            title={!isOpen ? `${usuario.name} (${usuario.email})` : undefined}
                        >
                            <div className="p-1.5 bg-black/10 rounded-lg shrink-0">
                                <User className="w-5 h-5 text-black" />
                            </div>
                            {isOpen && (
                                <div 
                                    className={`
                                        flex flex-col min-w-0 leading-tight transition-all duration-200
                                        ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                                    `}
                                >
                                    <span className="text-xs font-bold text-black truncate">{usuario.name}</span>
                                    <span className="text-[10px] text-gray-600 truncate">{usuario.email}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className={`
                            flex items-center gap-3 p-2.5 rounded-xl text-black hover:bg-red-500/10 hover:text-red-600 transition-colors w-full cursor-pointer
                            ${isOpen ? "justify-start px-3" : "justify-center"}
                        `}
                        title={!isOpen ? "Sair" : undefined}
                    >
                        <LogOut className="w-6 h-6 shrink-0 stroke-[2.5]" />
                        {isOpen && (
                            <span 
                                className={`
                                    text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200
                                    ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                                `}
                            >
                                Sair
                            </span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    )
}
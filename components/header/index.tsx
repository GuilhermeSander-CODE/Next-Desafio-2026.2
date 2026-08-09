'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react"
import { Menu, X } from "lucide-react";

const links = [
    {href: '/', lable: 'Home'},
    {href: '/contato', lable: 'Contato'},
    {href: '/produtos', lable: 'Produtos'},
    {href: '/adimin', lable: 'Gerenciamento'},
    {href: '/login', lable: 'Login'},
    {href: '/carrinho', lable: 'Carrinho'}
]

export default function Header(){

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => setIsNavOpen(!isNavOpen)

    return(
        <header className="bg-piano-black sticky top-0 z-20 w-full py-4 px-6 lg:px-12 mb-8">
            <div className="flex flex-wrap items-center justify-between w-full">
                
                <Link href='/' className="flex gap-4 items-center shrink-0">
                    <Image 
                        src={'/logo/Logo-Site.png'} 
                        alt="Logo do site"
                        width={904}
                        height={904}
                        unoptimized
                        loading="eager"
                        className="h-20 w-20 rounded-xl xl:h-30 xl:w-30 2xl:h-40 2xl:w-40"
                    />
                </Link>

                <nav className="flex justify-end">
                    <div className="hidden w-full lg:flex justify-items-end items-center gap-5 xl:gap-6">
                        {links.map((link, index) => 
                            <Link href={link.href} key={index} className="shrink-0">
                                <span className='text-base xl:text-2xl 2xl:text-3xl text-electric-violet
                                hover:bg-white/20 p-2 rounded-xl whitespace-nowrap transition-colors'>
                                    {link.lable}
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className="lg:hidden">
                        {isNavOpen ?
                            <X 
                                onClick={toggleNav}
                                className="w-10 h-10 text-electric-violet cursor-pointer "
                            />
                            :
                            <div className="flex gap-4">
                                <Menu 
                                    onClick={toggleNav}
                                    className="w-10 h-10 text-electric-violet cursor-pointer"
                                />

                            </div>
                        }
                    </div>
                </nav>

                {isNavOpen && (
                    <div className="lg:hidden flex basis-full flex-col items-center gap-4 pt-6 pb-4 w-full">
                        {links.map((link, index) => 
                            <Link href={link.href} key={index}>
                                <span className='text-xl text-electric-violet hover:bg-white/20 
                                px-4 py-2 rounded-xl block text-center'>
                                    {link.lable}
                                </span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}
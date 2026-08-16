import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="bg-piano-black text-white py-16 px-6 md:px-12 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <span className="text-electric-violet font-semibold uppercase tracking-wider text-sm">
                        Sua loja especializada em mangás
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        Encontre seus mangás favoritos aqui.
                    </h1>
                    <p className="text-moon-gray text-lg max-w-lg mx-auto lg:mx-0">
                        As melhores coleções, lançamentos imperdíveis e entregas rápidas
                        para todo o Brasil.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                        <Link
                            href="/produtos"
                            className="bg-electric-violet hover:bg-violet-700
                            text-white font-semibold px-6 py-3 rounded-xl transition-all"
                        >
                            Explorar Catálogo
                        </Link>
                        <Link
                            href="/sobre"
                            className="border border-white/20 hover:bg-white/10 text-white 
                            font-semibold px-6 py-3 rounded-xl transition-all"
                        >
                            Conheça a Loja
                        </Link>
                    </div>
                </div>

                <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center shadow-2xl">
                    <Image
                        src="/capas/Capa-default-3.png"
                        alt="Capa de destaque da semana"
                        width={200}
                        height={300}
                        unoptimized
                        loading="eager"
                        className="rounded-lg object-cover w-36 sm:w-44 shrink-0"
                    />
                    <div className="flex flex-col gap-3 text-center sm:text-left">
                        <span className="bg-white/20 text-white border-quiet-gray border-3 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-xl w-fit mx-auto sm:mx-0">
                            DESTAQUE DA SEMANA
                        </span>
                        <h3 className="text-2xl font-bold font-alkalami">
                            Jujutsu Kaisen Vol. 1
                        </h3>
                        <p className="text-xs text-moon-gray line-clamp-3">
                            Yuuji Itadori é um estudante do ensino médio que passa seu tempo
                            no clube de ocultismo...
                        </p>
                        <div className="flex flex-col gap-4 md:flex-row items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <span className="text-base md:text-base font-bold text-deep-lime-green">
                                R$ 34,90
                            </span>
                            <button className="bg-persian-red items-center flex flex-row gap-2 justify-center hover:opacity-90 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all">
                                <ShoppingCart className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

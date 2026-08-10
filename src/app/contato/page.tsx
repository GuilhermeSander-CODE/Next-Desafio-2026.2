import { AtSign, MapPin, Phone } from "lucide-react";

export default function PaginaContato(){
    return(
        <main className="w-full md:p-0 min-h-screen text-black py-10 px-4 sm:px-8 bg-titanium-white">
            <div className="max-w-6xl mx-auto pb-10">
                <div className="text-center mb-10 py-10 pb-4 border-b  border-moon-gray">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Entre em Contato
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    <div className=" flex flex-col gap-6">
                        <h2 className="text-xl font-bold">Formas de Contato</h2>
                        <div className="flex flex-col gap-4 text-sm font-medium">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 shrink-0"/>
                                <span>(32)00000-0000</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <AtSign className="w-5 h-5 shrink-0"/>
                                <span>email@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 shrink-0"/>
                                <span>Rua Saldanha Marinho, 391 - Centro - Juiz de Fora/MG</span>
                            </div>

                        </div>
                        <div className="w-full h-64 sm:h-80 bg-blue-400 rounded-lg 
                         border border-whisper-white overflow-hidden relative mt-2">
                            <iframe 
                                title="Mapa de Localização"
                                src="https://maps.google.com/maps?q=Juiz+de+Fora+MG&t=&z=13&ie=UTF98&iwloc=&output=embed" 
                                className="w-full h-full border-0"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    <form className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="nome" className="text-sm font-bold">Nome Completo</label>
                            <input 
                                type="text" 
                                id="nome"
                                placeholder="Digite aqui..."
                                className="w-full bg-white border border-moon-gray rounded-md 
                                p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                                placeholder:text-gray-400 shadow-xs"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-bold">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                placeholder="Digite aqui..."
                                className="w-full bg-white border border-moon-gray rounded-md 
                                p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                                placeholder:text-gray-400 shadow-xs"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="mensagem" className="text-sm font-bold">Mensagem</label>
                            <textarea
                                id="mensagem"
                                rows={5}
                                placeholder="Digite aqui..."
                                className="w-full bg-white border border-moon-gray rounded-md 
                                p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                                placeholder:text-gray-400 shadow-xs resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-end mt-2">
                            <button 
                                type="submit"
                                className="bg-dodger-blue hover:bg-blue-600 text-white font-semibold
                                py-2.5 px-8 rounded-lg transition-colors cursor-pointer shadow-md active: scale-95"
                            >
                                Enviar Mensagem
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
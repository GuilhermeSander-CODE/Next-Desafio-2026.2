import CardSobre from "./card";

export default function SobreNos(){
    return(
        <div className="w-full space-y-12 px-4 sm:px-6">
            <div className="flex items-center w-full justify-center mb-6 px-2">
                <h2 className="text-2xl md:text-3xl font-bold text-black tracking-wide">
                    Sobre Nós
                </h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                <CardSobre 
                    src="/Icones/Missao-icone.png"
                    titulo="Missão"
                    descricao="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aliquam auctor enim metus, sed molestie neque pharetra ac. 
                    Integer in neque sit amet lacus congue porttitor eu non augue. 
                    Ut posuere nunc a feugiat tempor."
                />
                <CardSobre 
                    src="/Icones/Visao-icone.png"
                    titulo="Visão"
                    descricao="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aliquam auctor enim metus, sed molestie neque pharetra ac. 
                    Integer in neque sit amet lacus congue porttitor eu non augue. 
                    Ut posuere nunc a feugiat tempor."
                />
                <CardSobre 
                    src="/Icones/Valor-icone.png"
                    titulo="valores"
                    descricao="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aliquam auctor enim metus, sed molestie neque pharetra ac. 
                    Integer in neque sit amet lacus congue porttitor eu non augue. 
                    Ut posuere nunc a feugiat tempor."
                />
            </div>
        </div>
    )
}
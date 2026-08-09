import Image from "next/image";

type CardSobreProps = {
    titulo: string;
    descricao: string;
    src: string;
}

export default function CardSobre({titulo, descricao, src} : CardSobreProps){
    return(
        <div className=" flex flex-col items-center justify-center gap-8 max-w-sm 2xl:max-w-md 3xl:max-w-lg p-8
        transition-shadow duration-200 rounded-md hover:shadow-2xl bg-whisper-white">
            <Image 
                src = {src}
                alt = {titulo}
                width={120}
                height={120}
                unoptimized
                loading="eager"
                className="max-h-18.75 max-w-18.75 xl:max-h-30 xl:max-w-30 2xl:max-h-55 2xl:max-w-55 "
            />
            <h1 className=" text-center text-xl xl:text-2xl 2xl:text-3xl 4xl:text-4xl 
            text-black font-semibold cursor-default ">
                {titulo}
            </h1>
            <p className="text-moon-gray text-lg lg:text-xl 2xl:text-2xl 3xl:text-3xl text-center line-clamp-6">
                {descricao}
            </p>
        </div>
    )
}
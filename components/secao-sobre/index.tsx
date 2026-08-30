import CardSobre from "./card";

const ICONES_POR_TITULO: Record<string, string> = {
    "Missão": "/Icones/Missao-icone.png",
    "Visão": "/Icones/Visao-icone.png",
    "Valores": "/Icones/Valor-icone.png",
};

type Identidade = {
    id: number;
    title: string;
    text: string;
};

type RespostaAPI = {
    identities: Identidade[];
    status: number;
};

async function getIdentidades(): Promise<Identidade[]> {
    try {
        const res = await fetch("https://treinamentoapi.codejr.com.br/api/identities", {
            next: { revalidate: 3600 } 
        });

        if (!res.ok) {
            throw new Error("Falha ao buscar dados da API");
        }

        const data: RespostaAPI = await res.json();
        return data.identities || [];
    } 
    catch (error) {
        console.error("Erro ao carregar sessão Sobre:", error);
        return [];
    }
}

export default async function SobreNos(){
    const identidades = await getIdentidades();

    return(
        <div className="w-full space-y-12 px-4 sm:px-6">
            <div className="flex items-center w-full justify-center mb-6 px-2">
                <h2 className="text-2xl md:text-3xl font-bold text-black tracking-wide">
                    Sobre Nós
                </h2>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                {identidades.map((item) => (
                    <CardSobre 
                        key={item.id}
                        src={ICONES_POR_TITULO[item.title] || "/Icones/Missao-icone.png"}
                        titulo={item.title}
                        descricao={item.text}
                    />
                ))}
            </div>
        </div>
    )
}
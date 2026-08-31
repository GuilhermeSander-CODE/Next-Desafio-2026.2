'use server'

type ItemCarrinho = {
    id: number;
    quantidade: number;
}

const MEDIDAS_MANGA = {
    peso: 0.2,      
    altura: 2,       
    largura: 14,     
    comprimento: 21,
};

type ItemFreteMelhorEnvio = {
    id: number;
    name: string;
    price: string;
    delivery_time: number;
    error?: string;
    company: {
        id: number;
        name: string;
        picture: string;
    };
};

export async function calcularFreteAction(cepDestino: string, itensCarrinho: ItemCarrinho[]) {
    const cepLimpo = cepDestino.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        return { sucesso: false, mensagem: "CEP inválido." };
    }

    const produtos = itensCarrinho.map((item) => ({
        id: `manga-${item.id}`,
        width: MEDIDAS_MANGA.largura,
        height: MEDIDAS_MANGA.altura,
        length: MEDIDAS_MANGA.comprimento,
        weight: MEDIDAS_MANGA.peso,
        insurance_value: 0,
        quantity: item.quantidade
    }));

    try{
        const resposta = await fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
                "User-Agent": "ParaisoDoManga/1.0 (contato@paraisodomanga.com.br)"
            },
            body: JSON.stringify({
                from: { postal_code: "36010011" }, 
                to: { postal_code: cepLimpo }, 
                products: produtos
            })
        });

        const dados = await resposta.json();

        const fretesValidos = (dados as ItemFreteMelhorEnvio[]).filter((item: ItemFreteMelhorEnvio) => !item.error).map((item: ItemFreteMelhorEnvio) => ({
            id: item.id,
            nome: item.name,
            transportadora: item.company.name,
            preco: parseFloat(item.price),
            prazoDias: item.delivery_time
        }));

       return { sucesso: true, fretes: fretesValidos };

    } 
    catch (error) {
        return { sucesso: false, mensagem: `Erro ao consultar frete: ${error}` };
    }
}
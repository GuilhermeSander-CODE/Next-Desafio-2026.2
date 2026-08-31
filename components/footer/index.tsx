import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import { AtSign, MapPin, Phone } from "lucide-react";

const links = [
  { href: "/sobre", lable: "Sobre Nós" },
  { href: "/termos", lable: "Termos de Uso" },
  { href: "/politica", lable: "Politicas de Privacidade" },
];

const redes = [
  { href: "https://www.instagram.com/codejr", lable: <FaInstagram /> },
  { href: "https://www.linkedin.com/company/codejr/posts/?feedView=all", lable: <FaLinkedin /> },
  { href: "https://www.instagram.com/equipe.code", lable: <FaInstagram /> },
];

export default function Footer() {
  return (
    <footer className="bg-piano-black w-full py-10 px-6 md:px-12 text-white">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-8 min-h-70">
        <div className="flex flex-col items-center md:items-center justify-start h-full">
          <Link href="/" className="shrink-0">
            <Image
              src={"/logo/Logo-Site.png"}
              alt="Logo do site"
              width={904}
              height={904}
              unoptimized
              loading="eager"
              className="h-24 w-24 md:h-40 md:w-40 rounded-xl"
            />
          </Link>

          <p className="mt-4 text-sm md:text-base text-moon-gray text-center md:text-left max-w-xs">
            Sua loja especializada em mangás.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-xl md:text-2xl font-bold">Navegação</span>

            <div className="flex flex-col items-center md:items-start gap-2">
              {links.map((link, index) => (
                <Link href={link.href} key={index} className="shrink-0" target="_blank">
                  <span className="text-base text-white whitespace-nowrap">
                    {link.lable}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl md:text-2xl font-bold">
              Metodos de Pagamento
            </span>
            <Image
              src={"/bandeiras-cartoes-credito.png"}
              alt="Metodos de pagamento"
              width={904}
              height={904}
              unoptimized
              loading="eager"
              className="h-auto w-48 md:w-56 object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-xl md:text-2xl font-bold">Siga-nos em</span>

            <div className="flex flex-row gap-6">
              {redes.map((rede, index) => (
                <Link href={rede.href} key={index} className="shrink-0">
                  <span className="text-2xl md:text-3xl">{rede.lable}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-xl md:text-2xl font-bold">Contato</span>

            <div className="flex flex-col gap-3 items-center md:items-start">
              <div className="flex items-center gap-3 text-moon-gray md:text-white">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <span className="text-sm md:text-base">(32) 99123-5568</span>
              </div>

              <div className="flex items-center gap-3 text-moon-gray md:text-white">
                <AtSign className="w-5 h-5 text-white shrink-0" />
                <span className="text-sm md:text-base">paraisodomanga@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 text-moon-gray md:text-white max-w-xs text-center md:text-left">
                <MapPin className="w-5 h-5 text-white shrink-0" />
                <span className="text-sm md:text-base">
                  Avenida Barão do Rio Branco, 500 - Centro - Juiz de Fora/MG
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10 text-center">
        <p className="text-xs md:text-sm text-moon-gray">
          © 2026 Paraíso dos Mangás. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Alkalami } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";

const inter = Inter({
  weight: ['300','400','500','600','700','800','900'],
  subsets: ["latin"],
});

const alkalami = Alkalami({
  weight:['400'],
  subsets: ['arabic','latin'],
  variable: '--font-alkalami',
})

export const metadata: Metadata = {
  title: "Paraiso do Manga",
  description: "Melhor loja de mangas do Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    
    <html lang="en" className={alkalami.variable}>
      <body className={inter.className}> 
        
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}

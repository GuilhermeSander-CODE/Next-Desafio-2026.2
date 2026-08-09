import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({
  weight: ['300','400','500','600','700','800','900'],
  subsets: ["latin"]
});

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
    <html lang="en">
      <body className={inter.className}> 
        <Header />
        {children}
        <Footer />

      </body>
    </html>
  );
}

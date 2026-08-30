import Sidebar from "@/components/sidebar";
import {cookies} from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }){
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        redirect("/login");
    }

    return(
        <main className="relative flex pb-3 pl-1 pt-3 pr-3 flex-col md:flex-row min-h-screen w-full bg-[url('/Fundo-principal.png')] bg-center bg-cover bg-fixed bg-no-repeat">
            <Sidebar />

            <div className="flex-1 w-full ml-0 md:ml-24 transition-all duration-300">
                {children}
            </div>
        </main>
    );
}
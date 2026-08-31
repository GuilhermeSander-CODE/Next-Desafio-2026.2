import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import { obterUsuarioAtualAction, realizarLogoutAction } from "../actions/auth-actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }){
    const { sucesso, usuario } = await obterUsuarioAtualAction();

    
    if (!sucesso || !usuario) {
        await realizarLogoutAction();
        redirect("/login");
    }

    return(
        <main className="min-h-screen w-full bg-[url('/Fundo-principal.png')] bg-center bg-cover bg-fixed bg-no-repeat p-3 flex flex-col md:flex-row gap-4">
            <Sidebar usuario={usuario} />

            <div className="flex-1 min-w-0">
                {children}
            </div>
        </main>
    );
}
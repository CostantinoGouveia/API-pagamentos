import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgeInfo } from "lucide-react";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    async function handle_click(e: any) {
        e.preventDefault()
        console.log(email, senha)
    }
    return (
        <div className="flex flex-col w-96  m-auto mt-10 gap-3">
        <div className="flex flex-col gap-2">
            <h1 className="h3 flex gap-1 font-bold text-blue-600">Sistema de Pagamentos <BadgeInfo /> </h1>
            <h1 className="text-2xl font-medium">Insira suas credencias para entrar na plataforma</h1>
        </div>
        <form className="flex flex-col px-8 gap-6 bg-slate-300/30 p-20 rounded-lg ">
            <div className="flex flex-col  gap-2">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="BI" />
                <Input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Palavra-passe" />
            </div>
            <Button onClick={handle_click} className="w-full">Iniciar sessão</Button>
        </form>
    </div>
    );
  }
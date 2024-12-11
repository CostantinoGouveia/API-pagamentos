"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [next, setNext] = useState(false)
  const [ref, setRef] = useState("")
  const [valor, setValor] = useState("")
  async function handle_click() {
    const dados = await fetch("http://localhost:3000/pagamentos/confirmar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        referencia: ref
      })
    })
    const res = await dados.json()
    console.log(res)
    setValor(res.valorPago)
    if (res.error) {
      alert("Referencia invalida")
      return
    }
    if(res.status === "PAGO"){
      alert("Referencia ja paga")
      return
    }
    setNext(true)
  }
  if (next) {
    return <Payment entidade="DTSER" valor={valor} referencia={ref} />
  }
  return (

    <div className="">
      <Card className="max-w-lg mt-[100px] mx-auto">
        <CardHeader>
          <h1>Efectuar pagemento</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="Referencia" />
            <Button onClick={handle_click} size={"sm"} className="w-full">
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


function Payment({ referencia, valor, entidade }: { referencia: string, valor: string, entidade: string }) {
 async function handle_click() {
    const dados = await fetch("http://localhost:3000/pagamentos/atualizar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        referencia: referencia
      })
    })
    const res = await dados.json()
    if (res.error) {
      alert("Falha ao pagar")
      return
    }
    alert("Pagamento efectuado")
    window.location.reload()
  }
  return (
    <div className="">
      <Card className="max-w-lg mt-[100px] mx-auto">
        <CardHeader>
          <h1>Efectuar pagemento</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Input placeholder="Entidade Ao" value={entidade} readOnly />
            <Input placeholder="00323023" value={referencia} readOnly />
            <Input placeholder="10000" value={valor} readOnly />
            <Button size={"sm"} className="w-full" onClick={handle_click}>
              Pagar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

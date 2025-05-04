import Container from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CustomerProps } from "@/utils/customer.type";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function NewTicket(){
    const session  = await getServerSession(authOptions);
    
    const customers = await prisma.customer.findMany({
        where:{
            userId: session?.user.id 
        }
    })
    
    const handleRegisterTicket = async (formData: FormData)=>{
        "use server"
        const name = formData.get("name");
        const description = formData.get("description");
        const customer = formData.get("customer");

        if(!name || !description || !customer) return;

        await prisma.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                status: "ABERTO",
                customerId: customer as string,
                userId: session?.user.id as string,
            }
        });
        console.log("Chamado aberto");
    }

    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="text-white px-4 py-1 rounded bg-gray-900">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo chamado</h1>                
                </div>

                <form className="flex flex-col mt-6" action={handleRegisterTicket}>

                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input
                        name="name" 
                        className="w-full border-2 rounded-md px-2 mb-2 h-11"
                        type="text" 
                        placeholder="Digite o título do chamado"
                        required
                    />

                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <textarea
                        name="description" 
                        className="w-full border-2 rounded-md px-2 mb-2 h-32 resize-none"
                        placeholder="Descreva o problema..."
                        required
                    ></textarea>

                    {customers.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                            <select
                                name="customer" 
                                className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
                            >
                                <option value="">Escolha um cliente...</option>
                                {customers.map((customer: CustomerProps) => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                    {customers.length === 0 && (
                        <Link href="/dashboard/customer/new">
                            Você ainda não tem clientes, <span className="font-medium text-blue-500">Cadastrar cliente</span>
                        </Link>
                    )}
                    

                    <button 
                    disabled={customers.length === 0 ? true:false}
                    className={`
                        bg-blue-500 border-none outline-none cursor-pointer duration-300 text-white font-bold self-start my-4 px-6 h-11 rounded 
                        disabled:opacity-[0.5] disabled:cursor-not-allowed not-disabled:hover:bg-blue-700
                    `}
                     
                    type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </Container>
    )
}
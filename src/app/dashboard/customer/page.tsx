import Container from "@/components/container";
import Link from "next/link";
import CardCustomer from "./components/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CustomerProps } from "@/utils/customer.type";

const Customer = async ()=>{
    const session = await getServerSession(authOptions);
    if(!session || !session.user) redirect("/");

    const customers = await prisma.customer.findMany({
        where:{
            userId: session.user.id,
        }
    });

      
    return (
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link className="bg-blue-500 text-white px-4 py-1 rounded" href="/dashboard/customer/new">
                        Novo cliente
                    </Link>
                </div>
                
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                    {customers.length <= 0 &&
                    <p>Você não possui clientes.</p>
                    }
                    {customers.map((customer: CustomerProps) =>(
                        <CardCustomer 
                            key={customer.id}
                            customer={customer}
                        />
                    ))}
                </section>
            </main>
        </Container>
    )
}

export default Customer;
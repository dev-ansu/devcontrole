import Container from "@/components/container";
import Link from "next/link";
import NewCustomerForm from "../components/card/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


const NewCustomer = async ()=>{
    const session = await getServerSession(authOptions);

    return(
        <Container>
            <main>
                <div className="flex items-center gap-2">
                    <Link className="bg-gray-900 text-white px-4 py-1 rounded" href="/dashboard/customer">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo cliente</h1>
                </div>

                <NewCustomerForm userId={session?.user.id as string} />
            </main>
        </Container>
    )
}

export default NewCustomer;
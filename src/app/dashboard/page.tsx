"use client"
import Container from "@/components/container";
import Link from "next/link";
import TicketItem from "./components/ticket";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TicketProps } from "@/utils/tickets.type";
import { CustomerProps } from "@/utils/customer.type";
import { Loader } from "lucide-react";


const Dashboard = ()=>{
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("")

    const getTickets = async()=>{
        setLoading(true);
        const res = await api.get("/api/ticket?status=" + status);
        if(res.data.success){
            setTickets(res.data.tickets)
        }
        setLoading(false);
    } 

    const handleStatusChange = () => {
        getTickets();
    };

    useEffect(()=>{  
        getTickets();
    },[status]);
    

    return (
        <Container>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Chamados</h1>
                <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                    Abrir chamado
                </Link>
            </div>
            {!loading ? (
            <>
            <div className="flex gap-2 mb-4 mt-4">
                <button disabled={loading ? true:false} onClick={()=> setStatus("FECHADO")} className={`bg-red-500 disabled:opacity-[0.5] disabled:cursor-default cursor-pointer text-white rounded px-2 py-1`}>FECHADOS</button>
                <button disabled={loading ? true:false} onClick={()=> setStatus("ABERTO")} className={`bg-green-500 disabled:opacity-[0.5] disabled:cursor-default cursor-pointer text-white rounded px-2 py-1`}>ABERTOS</button>
            </div>
            
            <table className="min-w-full my-2">
                <thead>
                    <tr className="text-center">
                        <th className="font-medium">Cliente</th>
                        <th className="font-medium hidden sm:block">Data de cadastro</th>
                        <th className="font-medium">Status</th>
                        <th className="font-medium">#</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map((ticket: TicketProps & {customer: CustomerProps }) => (
                        <TicketItem key={ticket.id} handleStatusChange={handleStatusChange} ticket={ticket} customer={ticket.customer} />
                    ))}
                </tbody>
            </table>
            {tickets && tickets.length == 0 &&
                <h1 className="px-2 md:px-0 text-gray-600">Nenhum ticket aberto ainda.</h1>
            }
            </>
            )
            :<Loader className="animate-spin mt-4" size={64} />
            }
        </Container>

    )            
}


export default Dashboard;
    
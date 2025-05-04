"use client";
import { useModal } from "@/app/providers/modal";
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/tickets.type";
import { AxiosError } from "axios";
import { CheckSquare, File, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface TicketItemProps{
    ticket: TicketProps;
    customer: CustomerProps | null;
    handleStatusChange: () => void;
}

const TicketItem = ({ ticket, customer, handleStatusChange }: TicketItemProps)=>{
    const {handleModalVisible, setDetailTicket} = useModal();

 
    const handleChangeStatus = async()=>{
        if(!window.confirm("Deseja realmente fechar este chamado?")) return;
        try{
            const res = await api.patch("/api/ticket", { id: ticket.id })
            if(res.data.success){
                toast.success(res.data.message)
                handleStatusChange();
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            if(err instanceof AxiosError){
                toast.error(err.message)
            }
            console.log(err);
        }
    }

    function handleOpenModal(){
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket,
        });
    }

    return(
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200">
               <td className="text-left pl-2">{customer?.name}</td>
               <td className="text-center hidden sm:table-cell">{new Date(ticket.created_at as Date).toLocaleDateString('pt-br')}</td>
               <td className="text-center">
                    {ticket.status == "ABERTO" &&
                        <span className="bg-green-500 rounded px-2 py-1">
                            {ticket.status}
                        </span>
                    }
                    {ticket.status == "FECHADO" &&
                        <span className="bg-red-500 text-white rounded px-2 py-1">
                            {ticket.status}
                        </span>
                    }
                    
                </td>
                <td className="">
                    <button 
                    onClick={handleChangeStatus}
                    className="mr-2 cursor-pointer"><CheckSquare size={24} color="#131313"/></button>
                    <button onClick={handleOpenModal} className="cursor-pointer"><File   size={24} color="#3b82f6"/></button>
                </td>
            </tr>
        </>
    )
}

export default TicketItem;
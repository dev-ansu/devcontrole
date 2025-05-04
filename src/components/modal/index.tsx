"use client";
import * as motion from "motion/react-client"
import { X } from "lucide-react";
import { useModal } from "@/app/providers/modal";
import { MouseEvent, useRef } from "react";

export const ModalTicket = ()=>{
    const {handleModalVisible, ticket} = useModal();
    const modalRef = useRef<HTMLDivElement | null>(null);
    
    const handleModalClick = (e: MouseEvent<HTMLDivElement>)=>{
        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            handleModalVisible();
        }
    }

    return(
        <div className="absolute bg-gray-900/80 overflow-hidden  w-full min-h-screen max-h-screen" onClick={handleModalClick}>
            <div className="absolute inset-0 flex  items-center justify-center">
            <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        scale: { type: "spring", visualDuration: 1, bounce: 0.5 },
                    }}
                    className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
                    ref={modalRef}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>
                        <button onClick={handleModalVisible} className="bg-red-500 p-1 px-2 text-white rounded flex cursor-pointer items-center justify-center gap-1 transition-all hover:bg-red-600">FECHAR <X /></button>
                    </div>

                    <div className="flex gap-1 mb-2 flex-wrap">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{ticket?.ticket?.name}</p>
                    </div>

                    <div className="flex flex-col gap-1 mb-2 flex-wrap">
                        <h2 className="font-bold">Descrição:</h2>
                        <p>{ticket?.ticket.description}</p>
                    </div>

                    <div className="w-full border-b-[1.5px] my-4"></div>

                    <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>

                    <div className="flex gap-1 mb-2 flex-wrap">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{ticket?.customer?.name}</p>
                    </div>

                    <div className="flex gap-1 mb-2 flex-wrap">
                        <h2 className="font-bold">Telefone:</h2>
                        <p>{ticket?.customer?.phone}</p>
                    </div>

                    <div className="flex gap-1 mb-2 flex-wrap">
                        <h2 className="font-bold">E-mail:</h2>
                        <p>{ticket?.customer?.email}</p>
                    </div>

                    {ticket?.customer?.address && 
                        <div className="flex gap-1 mb-2 flex-wrap">
                            <h2 className="font-bold">Endereço:</h2>
                            <p>{ticket?.customer?.address}</p>
                        </div>
                    }
                </motion.div>
            </div>
        </div>
    )
}

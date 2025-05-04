"use client";

import { useState, createContext, ReactNode, useContext, useCallback, useEffect } from "react";
import { CustomerProps } from "@/utils/customer.type"
import { TicketProps } from "@/utils/tickets.type"
import { ModalTicket } from "@/components/modal";
import { AnimatePresence, motion } from "motion/react";

interface ModalContextData{
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfo | undefined;
    setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo{
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export const ModalProvider = ({ children }: {children: ReactNode})=>{
    const [visible, setVisible] = useState(false);
    const [ticket, setTicket] = useState<TicketInfo>();

    // Função para alternar visibilidade do modal, usando useCallback para evitar recriações desnecessárias
    const handleModalVisible = useCallback(()=>{
        setVisible(!visible)
    },[visible])

    useEffect(() => {
        if (visible) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
    
        // Limpeza ao desmontar
        return () => {
          document.body.style.overflow = "";
        };
    }, [visible]);

    const setDetailTicket = (detail: TicketInfo)=>{
        setTicket(detail)
    }
    
    return(
        <ModalContext.Provider value={{handleModalVisible, visible, ticket, setDetailTicket}}>
            <AnimatePresence initial={false}>
                {visible && 
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <ModalTicket />
                    </motion.div>
                
                }
            </AnimatePresence>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext);
  
    if (!context) {
      throw new Error("useModal deve ser usado dentro de um ModalProvider");
    }
  
    return context;
}
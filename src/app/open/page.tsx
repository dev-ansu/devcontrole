"use client";

import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Search, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormTicket } from "./components/FormTicket";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

const schema = z.object({
    email: z.string().email("Digite um e-mail válido.").min(1, "O campo é obrigatório."),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo{
    id: string;
    name: string;
}

export default function page(){
    const [customer, setCustomer] = useState<CustomerDataInfo | null>();
    const [loading, setLoading] = useState(false);

    const {register, setError,resetField,setValue,handleSubmit, formState:{ errors }} = useForm<FormData>({
        mode: "all",
        criteriaMode:"all",
        resolver: zodResolver(schema),
    });

    const handleClearCustomer = ()=>{
        setCustomer(null);
        resetField("email");
        setValue("email", "");
    }

    const handleSearchCustomer = async(data: FormData)=>{
        setLoading(true);
        const res = await api.get("/api/customer/by-email/" + data.email)
        if(res.data.success){
            setCustomer({
                id: res.data.customer.id as string,
                name: res.data.customer.name as string,
            })
        }else{
            setError("email", {message:"Ops, cliente não foi encontrado."})
            toast.error(res.data.message)
            setValue("email", "");
        }
        setLoading(false);
    }

    return(
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>        

            <main className="flex flex-col mt-4 mb-2 ">
                {customer ? 
                    <div className="bg-slate-50 flex items-center justify-between py-6 px-4 rounded border-[1px] border-gray-300">
                        <p className="text-lg ">
                            <strong>Cliente selecionado: </strong>
                            {customer.name}
                        </p>                        
                        <button onClick={handleClearCustomer} className="group transition-all hover:bg-red-600 text-white h-11 px-2 flex items-center justify-center cursor-pointer rounded">
                            <X className="group-hover:text-white text-red-500" size={32}/>
                        </button>
                    </div>
                    :
                    <>
                    {!loading && 
                    <form onSubmit={handleSubmit(handleSearchCustomer)} className="bg-slate-50 py-6 px-2 rounded border-[1px] border-gray-300">
                        <div className="flex flex-col gap-3">
                            <Input 
                                name="email"
                                register={register}
                                error={errors.email?.message}                            
                                placeholder="Digite seu e-mail"
                            />    
                            <button className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center cursor-pointer justify-center text-white font-bold rounded">
                                Procurar cliente
                                <Search  size={24} color="#fff"/>
                            </button>
                        </div>                    
                    </form>
                    }
                    {loading && <Loader className="animate-spin self-center" size={36} />}
                    </>
                }
                
                {customer && 
                    <FormTicket customer={customer} />
                }
            </main>
        </div>
    )
}


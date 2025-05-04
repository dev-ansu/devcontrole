"use client";
import Input from "@/components/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomerDataInfo } from "../../page";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useState } from "react";

const schema = z.object({
    name: z.string().min(1, 'O título do chamado é obrigatório.'),
    description: z.string().min(1, 'Descreva com detalhes seu problema.'),
})

type FormData = z.infer<typeof schema>;

export const FormTicket = ({customer}: {customer: CustomerDataInfo})=>{
    const [loading, setLoading] = useState(false);
    const {handleSubmit, register, reset, formState: {errors}} = useForm<FormData>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(schema)
    });

    const handleRegister = async(data: FormData)=>{
        setLoading(true)
        const newData = {...data, customerId: customer.id}
        const res = await api.post("/api/ticket", newData);
        if(res.data.success){
            toast.success(res.data.message);
            reset();
        }else{
            toast.error(res.data.message);
        }
        setLoading(false)

    }

    return(
        <form onSubmit={handleSubmit(handleRegister)} className="bg-slate-50 mt-6 px-4 py-6 rounded border-[1px] border-gray-200">
            
            <label className="mb-1 font-medium text-lg" htmlFor="">Título do chamado</label>
            <Input 
                name="name"
                register={register}
                error={errors.name?.message}
                placeholder="Título do chamado"
            />

            <label className="mb-1 font-medium text-lg" htmlFor="">Descreva o motivo do chamado</label>
            <textarea 
                {...register("description")}
                className="w-full border-[1px] border-gray-300  rounded-md h-24 resize-none px-2"
                placeholder="Descreva o seu problema"
            ></textarea>
            {errors.description && <span className="text-red-500">{errors.description?.message}</span>}

            <button 
            disabled={!!loading}
            className="
                disabled:opacity-[0.5]
                bg-blue-500
                mt-4
                rounded w-full h-11 px-2 text-white font-bold
                not-disabled:cursor-pointer
                cursor-default
            ">
                Cadastrar
            </button>

            
        </form>
    )
}
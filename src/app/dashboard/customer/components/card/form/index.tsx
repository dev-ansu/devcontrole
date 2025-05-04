"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";



export const NewCustomerSchema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório."),
    email: z.string().email("Digite um e-mail válido.").min(1, "O e-mail é obrigatório."),
    phone: z.string().refine((value)=>{
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || 
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value);
    },{
        message: "O número de telefone deve estar no formato (DD) 999999999"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof NewCustomerSchema>;

const NewCustomerForm = ({ userId } : { userId: string })=>{
    const {register, handleSubmit, formState:{ errors } } = useForm<FormData>({
        mode:"all",
        criteriaMode:"all",
        resolver: zodResolver(NewCustomerSchema),
    });    
    const router = useRouter();

    const handleRegisterCustomer = async (data: FormData)=>{
        try{
            const response = await api.post("/api/customer", {
                ...data,
                userId: userId
            });
            
            if(response.data.success){
                router.refresh();
                router.replace("/dashboard/customer")            
            }

        }catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit(handleRegisterCustomer)} className="mt-6 flex flex-col">

                
                <label className="mb-1 text-lg font-medium" htmlFor="">Nome completo:</label>
                
                <Input 
                    type="text"
                    name="name"
                    error={errors.name?.message}
                    register={register}
                    placeholder="Nome do cliente"
                />

                <section className="flex gap-2 w-full mt-4 flex-col sm:flex-row">

                    <div className="flex-1">
                        <label className="mb-1 text-lg font-medium" htmlFor="">Telefone:</label>
                    
                        <Input 
                            type="text"
                            name="phone"
                            error={errors.phone?.message}
                            register={register}
                            placeholder="Telefone do cliente"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="mb-1 text-lg font-medium" htmlFor="">E-mail:</label>
                    
                        <Input 
                            type="email"
                            name="email"
                            error={errors.email?.message}
                            register={register}
                            placeholder="Telefone do cliente"
                        />
                    </div>
                </section>

                <label className="mb-1 text-lg font-medium" htmlFor="">Endereço completo:</label>
                    
                <Input 
                    type="text"
                    name="address"
                    error={errors.address?.message}
                    register={register}
                    placeholder="Endereço do cliente"
                />

                <button className="bg-blue-500 border-none outline-none cursor-pointer hover:bg-blue-700 duration-300 text-white font-bold self-start my-4 px-6 h-11 rounded" type="submit">
                    Cadastrar
                </button>
            </form>

        </>
    )
}

export default NewCustomerForm;
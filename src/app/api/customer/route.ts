import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const NewCustomerSchema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório."),
    email: z.string().email("Digite um e-mail válido.").min(1, "O e-mail é obrigatório."),
    phone: z.string().refine((value)=>{
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || 
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value);
    },{
        message: "O número de telefone deve estar no formato (DD) 999999999"
    }),
    userId: z.string().min(1, 'O id do usuário é obrigatório'),
    address: z.string().optional(),
})

export async function POST(req: Request){
    const session = await getServerSession(authOptions)

    if(!session || !session.user) return NextResponse.json({
        error: "Not authorized"
    }, { status: 401 });

    try{

        const body = await req.json();
        const validatedData = NewCustomerSchema.parse(body);

        await prisma.customer.create({
            data:{
                ...validatedData,
                created_at: new Date,
                updated_at: new Date,
            }
        })
        
        return NextResponse.json({
            success: true,
            message: "Cliente cadastrado com sucesso.",
        }, { status: 201 })

    }catch(error: any){
        return NextResponse.json({ success: false, error: error.errors, message:"Failed create new costumer" }, { status: 400 })
    }
}
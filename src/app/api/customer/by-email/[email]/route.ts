import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest, {params}: { params: Promise<{email: string }>}
){    
    const { email } = await params;

    try{

        const customer = await prisma.customer.findFirst({
            where:{
                email: email,
            }
        });
        
        if(!customer){
            return NextResponse.json({success: false, message:"Nenhum cliente foi encontrado."});
        }

        return NextResponse.json({success: true, customer});

    }catch(err){
        return NextResponse.json({success: false, message:"Erro interno servidor."});
    }

}
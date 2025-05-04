import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest, {params}: { params: Promise<{id: string }>}
){
    const session = await getServerSession(authOptions)
    
    if(!session || !session.user) return NextResponse.json({success: false, message: "Não autorizado"}, { status: 401, headers: {"Content-Type": "application/json"}})
    
    const { id } = await params;

    try{

        const deleted = await prisma.customer.delete({
            where:{
                id: id,
                userId: session.user.id
            }
        })
        if(!deleted){
            return NextResponse.json({success: false, message:"Não foi possível deletar o cliente."});
        }

        return NextResponse.json({success: true, message:"Cliente deletado com sucesso!"});

    }catch(err){
        return NextResponse.json({success: false, message:"Não foi possível deletar o cliente."});
    }

}


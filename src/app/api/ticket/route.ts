import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const session = await getServerSession(authOptions);
    if(!session || !session.user) return NextResponse.json({success: false, message: "Não autorizado"}, {status: 401})
    
    const status = request.nextUrl.searchParams.get("status") || "ABERTO";

    try{
        const tickets = await prisma.ticket.findMany({
            where:{
                customer: {
                    userId: session.user.id,
                },                
                status,
            },
            include: { customer: true },
            orderBy: { created_at: "desc"}
        });
        return NextResponse.json({success: true, tickets})
    }catch(err){
        return NextResponse.json({success: false, message: "Erro inesperado"})

    }
}

export async function PATCH(request: NextRequest){
    try{
        const session = await getServerSession(authOptions);
        if(!session || !session.user) return NextResponse.json({success: false, message: "Não autorizado"}, {status: 401})

        const { id } = await request.json();
        const findTicket = await prisma.ticket.findFirst({
            where: { id: id as string}
        });
        if(!findTicket) return NextResponse.json({ success: false, message: "Não foi possível atualizar o ticket, pois ele não foi encontrado." }, { status: 400 })
        
        await prisma.ticket.update({
            where: {id: id as string},
            data:{
                status: "FECHADO",
            }
        })

        return NextResponse.json({ success: true, message:"Chamado fechado com sucesso." })

    }catch(err){
        console.log(err);
        return NextResponse.json({success: false, message:"Erro interno do servidor."})
    }
}

export async function POST(request: NextRequest){
    try{
    
        const { description, name, customerId } = await request.json();
        
        
        await prisma.ticket.create({
            data:{
                description: description as string,
                name: name as string,
                customerId: customerId as string,
            }
        });

        return NextResponse.json({ success: true, message:"Chamado criado com sucesso." })

    }catch(err){
        console.log(err);
        return NextResponse.json({success: false, message:"Erro interno do servidor."})
    }
}
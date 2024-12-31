// route to store the students details in the bd from signup
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server"


export  async function POST(req:NextRequest){
    const body = await req.json()
    console.log(body)

    const prisma = new PrismaClient();
    const res = await prisma.student.create({
        data:{
            regno:body.regno,
            name:body.name,
            password:body.password
        }
    })
    if(res){
        return Response.json({
            message:"accoun created",
        });
    }

    return Response.json({
        messgae:"wait not created yet"
    })
    
}
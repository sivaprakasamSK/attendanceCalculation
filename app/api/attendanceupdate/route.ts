// route to update the absent hours by admin from the attendanceEntry page
import { NEXT_AUTH } from "@/app/lib/auth";
import {prisma} from "@/app/lib/prisma"
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const session = await getServerSession(NEXT_AUTH);
    const regno = session.user.regno

    const admin = prisma.admin.findUnique({
        where:{
            regno:regno
        }
    })

    if(!admin){
        alert("you are not in the admin list,so you can't update the data");
        return Response.json({
            message:"you are not an admin"
        });
    }

    const body = await req.json();

    try {
        const stu = await prisma.student.findUnique({
            where: {
                regno: body.regno,
            },
        });

        if (stu) {

            const totalAbsentHours = stu.absentHours + body.absentHours

            const updateUser = await prisma.student.update({
                where: {
                    regno: body.regno,
                },
                data: {
                    absentHours: totalAbsentHours
                }
            })
            return Response.json({
                message:"updated successfully"
            })
        } else {
            return Response.json({
                message: "no Student found"
            })
        }
    } catch (error) {
        return Response.json({
            message: "error occured while fetching the data from the DB"
        })
    }
}
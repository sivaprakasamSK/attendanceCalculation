// route to update the absent hours by admin from the attendanceEntry page
import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();

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
        } else {
            return Response.json({
                message: "no Student found"
            })
        }
    } catch (error) {
        return Response.json({
            message: "error occured while fetching the Student data"
        })
    }


}
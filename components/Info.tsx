import { NEXT_AUTH } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Info() {

    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/api/auth/signin");
    }

    const date = new Date();

    const m: string[] = ["January", "Febuary", "March", "April"]
    const month = m[date.getMonth()];

    const working = await prisma.workingdays.findFirst({
        where: {
            month: month
        }
    })
    const regno = parseInt(session.user.regno)
    const stu = await prisma.student.findFirst({
        where:{
            regno:regno
        }
    })
    if(!stu){
        throw new Error("error in the database while fetching the stu details")
    }
    if (!working) {
        throw new Error("error in the database while fetching the workingdays details")
    }

    const WorkingDays = working.days;
    const WorkingHours = working.hours;

    const totalabsentHours = (WorkingHours * 25) / 100;
    const totalabsentDays = totalabsentHours / 8;

    const stuAbsentHours = stu.absentHours;
    const stuAbsentDays = stuAbsentHours/8;

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#121212] ">
            <div className="text-4xl font-medium space-y-12 text-white ml-24">
                <div>
                    {`${month} has ${WorkingDays} workingdays ( ${WorkingHours} hours )`}
                </div>
                <div>
                    {`you can take total leave of ${totalabsentDays} days ( ${totalabsentHours} hours )`}
                </div>
                <div>
                    {`you already took ${stuAbsentDays.toFixed(2)} days ( ${stuAbsentHours} hours )`}
                </div>
            </div>
        </div>
    )
}

import { NEXT_AUTH } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ViewAttendance() {

    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/signin");
    }

    const m: string[] = ["january", "febuary", "march", "april"];

    const regno: number = session.user.regno;

    const date: Date = new Date();
    const currentMonthIndex: number = date.getMonth();
    const currentMonth: string = m[currentMonthIndex]


    const workingMonth = await prisma.workingdays.findUnique({
        where: {
            id: currentMonthIndex
        },
    });

    const stu = await prisma.student.findUnique({
        where: {
            regno: regno
        }
    });


    if (!workingMonth) {
        throw new Error("can't find the month")
    }

    if (!stu) {
        throw new Error("can't find the student")
    }



    const totalWorkingDays: number = workingMonth.days;
    const totalWorkingHours: number = workingMonth.hours;
    const attenedHours: number = totalWorkingHours - stu.absentHours;
    const attendacePercentage: number = (attenedHours / totalWorkingHours) * 100;

    return (
        <div className="flex min-h-screen justify-center items-center bg-[#121212]">
            <div className="text-2xl text-white">
                <div>
                    {`Total working days for ${currentMonth} is ${totalWorkingDays}`}
                </div>
                <div>
                    {`Total working hours for ${currentMonth} is ${totalWorkingHours}`}
                </div>
                <div>
                    {`You(${regno}) attended ${attenedHours} hours`}
                </div>
                <div>
                    {`your attendance percentage for ${currentMonth} is ${attendacePercentage}`}
                </div>
            </div>

        </div>
    )
}
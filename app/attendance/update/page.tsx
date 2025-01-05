import UpdateAttendance from "@/components/UpdateAttendance";
import Finishupdate from "@/components/FinishUpdate";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma"
import { redirect } from "next/navigation";

export default async function Update() {
    
    const session = await getServerSession(NEXT_AUTH);

    if (!session) {
        redirect("/api/auth/signin");
    }
    const regno = parseInt(session.user.regno);
    const admin = await prisma.admin.findFirst({
        where: {
            regno: regno
        }
    })

    if (!admin) {
        return <div className="flex justify-center items-center m-h-screen">
            <p>You don't have admin privilege</p>
        </div>
    }
    return (
        <div className="min-h-screen flex justify-center items-center text-lg text-white bg-[#121212]">
            <div className="space-y-12">
                <div>
                    <UpdateAttendance />
                </div>

                <div>
                    <Finishupdate />
                </div>
            </div>
        </div>
    )
}
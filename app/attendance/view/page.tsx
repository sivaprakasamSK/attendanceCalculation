import { NEXT_AUTH } from "@/app/lib/auth";
import ViewAttendance from "@/components/ViewAttendance";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ViewProps {
    searchParams: {
      month?: string;
    };
  }


export default async function View({ searchParams }: ViewProps) {
    

    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect('/signin');
    }

    const date: Date = new Date();
    const currentMonthIndex: number = date.getMonth();
    const reqMonthIndex = parseInt(searchParams.month ?? '0');
    
    if (reqMonthIndex == currentMonthIndex) {
        redirect("/attendance/pre_view");
    }

    return <div>
        <ViewAttendance></ViewAttendance>
    </div>
}
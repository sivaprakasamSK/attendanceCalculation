'use client'
import { useRouter } from "next/navigation";

export default function Finishupdate(){

    const router = useRouter();
    return (
        <div className="flex justify-center">
            <button onClick={()=>{
                router.push("/about")
            }}>Finish Update</button>
        </div>
    )
}
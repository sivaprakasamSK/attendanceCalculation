'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Appbar() {

    const session = useSession();
    const router = useRouter();
    const date = new Date();
    const month = date.getMonth();

    if (!session) {
        return;
    }
    return (
        <div className="flex justify-between border border-gray-700 shadow-sm shadow-white bg-black opacity-95">
            <div className="ml-8 flex space-x-12">
                <div className="cursor-pointer">
                    <Image
                        src="/images/vec.jpeg"
                        alt="Description"
                        width={70}
                        height={70}
                        onClick={() => {
                            router.push("/about");
                        }}
                        className="p-2"
                    />
                </div>

                <div className="flex items-center text-lg font-medium text-white">
                    {
                        (session.status === "authenticated") && (
                            <button onClick={() => {
                                router.push(`/attendance/view?month=${month}`);
                            }}>ViewPercentage</button>
                        )
                    }
                </div>
            </div>

            <div className="flex justify-between mr-4 space-x-4 text-white">
                <div className="flex items-center text-lg font-medium">
                    {
                        (session.status === "authenticated") && (
                            <button onClick={() => {
                                router.push("/attendance/update")
                            }}>AttendanceEntry</button>
                        )
                    }
                </div>
                <div className="flex items-center text-lg font-medium">
                    {
                        (session.status === "authenticated") && (
                            <div>
                                <button onClick={async() => {
                                   await signOut({ redirect: false });
                                   router.push("/");
                                }}>SignOut</button>
                            </div>
                        )
                    }


                    {
                        (session.status === "unauthenticated") && (
                            <div>
                                <button onClick={() => { signIn() }}>
                                    SignIn
                                </button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}
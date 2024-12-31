'use client'
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Signup() {

    const [name, useName] = useState(" ");
    const [password, usePassword] = useState(" ");
    const [reg, useReg] = useState(" ");
    const router = useRouter();

    return (
        <div className="flex justify-center min-h-screen items-center">
            <div className="space-y-12">
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="name" className="p-4" onChange={(e) => {
                        useName(e.target.value);
                    }} />
                </div>


                <div>
                    <label>regno</label>
                    <input type="number" placeholder="regno" className="p-4 " onChange={(e) => {
                        useReg(e.target.value);
                    }} />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" placeholder="password" className="p-4" onChange={(e) => {
                        usePassword(e.target.value);
                    }} />
                </div>

                <div>
                    <button onClick={async () => {
                        const ans = await axios.post("http://localhost:3000/api/user", {
                            name: name,
                            regno: parseInt(reg),
                            password: password
                        });

                        console.log(ans.status);


                        const res = await signIn("credentials", {
                            redirect: false,
                            regno: reg,
                            password: password,
                        }
                        );

                        if (res) {
                            router.push("/")
                        }


                    }}>Submit</button>
                </div>
            </div>
        </div>
    )
}
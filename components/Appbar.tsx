'use client'

import { signIn, signOut} from "next-auth/react"
import Link from "next/link";

export default function Appbar(){
    return (
        <div className="flex justify-around bg-red shadow">
            <div>
                <Link href={"/signup"}>Signup</Link>
            </div>
            <div>
                <button onClick={()=>{signIn()}}>SignIn</button>
            </div>

            <div>
                <button onClick={()=>{signOut()}}>SignOut</button>
            </div>

        </div>
    )
}
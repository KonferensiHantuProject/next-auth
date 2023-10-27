"use client"

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    // Router
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await signIn('credentials', {
                email,
                password,
                redirect:false
            });

            // If Error
            if (res.error){
                setError("Invalid");
                return;
            }

            // Final
            router.replace("dashboard");

        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Enter the Details</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Login
                    </button>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    {/* Link */}
                    <Link href={'/register'} className="text-sm mt-3 text-right">
                        Tidak Memiliki Akun? <span className="underline">Daftar</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
 
export default LoginForm;
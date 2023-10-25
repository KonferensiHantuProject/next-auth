"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const RegisterForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Router
    const router = useRouter();

    // Handling Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checking
        if(!name || !email || !password)
        {
            setError("Wajib Isi Semua");
            return;
        }

        // Try
        try{

            // Find User
            const find = await fetch('api/userExist', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            // Double One
            const user = await find.json();

            // Checking Double User Or No
            if (user){
                setError("User Sudah ada");
                return
            }

            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            // If Okay
            if(res.ok) {
                const form = e.target;
                form.reset();
                router.push("/")
            }else{
                console.log(res)
            }

        }catch(error){
            console.log("Errornya ", error)
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Fullname" />
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>
                    
                    {/* Error */}
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    {/* Link */}
                    <Link href={'/'} className="text-sm mt-3 text-right">
                        Sudah Memiliki Akun? <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}
 
export default RegisterForm;
"use client";

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LogIn() {
    const [isProcessingFetch, setIsProcessingFetch] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (Cookies.get("jwt")) {
            router.push('/profile')
        }
    }, [])

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsProcessingFetch(true);
        const formData = new FormData(e.currentTarget);

        try {
            console.log(process.env.NEXT_PUBLIC_SERVER_URL)
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'auth-alpha/login', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                email: formData.get("email"),
                password: formData.get("password")
              }),
            })
    
            if (!response.ok) {
                // Status is not 200 - add error handling
                console.log("[ERROR] error with login")
                const result = await response.json()
                toast.error("Wrong email or password. " + result.message)
                return
            }
    
            // Add validation to check correct response object
            const responseJson = await response.json()
            const tokenString = responseJson.token
    
            Cookies.set("jwt", tokenString)
    
            router.push('/profile')
        } catch (error) {
            console.error(error);
        } finally {
            setIsProcessingFetch(false);
        }
    }

    const buttonContent = 
        isProcessingFetch ? 
        <button type="submit" disabled className="
            flex justify-center items-center
            bg-gray-400 text-white
            rounded-md shadow-md border-1
            p-2 w-3xs h-10
        ">
            <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-8 h-8" />
        </button>
        :
        <button type="submit" className="
            flex justify-center items-center
            bg-blue-500 text-white
            hover:bg-blue-600
            rounded-md shadow-md border-1
            p-2 w-3xs h-10
            cursor-pointer
        ">
            Log In
        </button>

    // Add validations for inputs here and in SignUp
    return (
        <div className="
            flex flex-col
            h-120 w-sm
            rounded-lg p-2 shadow-md border-2
        ">
            <div className="text-2xl font-bold">
                Log into existing account
            </div>
            <form onSubmit={submit} className="
                flex flex-col flex-1
                justify-between items-center
                pb-4
            ">
                <div className="
                    flex flex-col gap-2
                    p-4 w-full
                ">
                    <label htmlFor="emailLogIn">Email:</label>
                    <input id="emailLogIn" type="email" name="email" placeholder="john_doe@gmail.com" className="border px-1 py-0.5" required />
                    <label htmlFor="passwordLogIn">Password:</label>
                    <input id="passwordLogIn" type="password" name="password" placeholder="********" className="border px-1 py-0.5" required />
                </div>
                <div className="
                    flex flex-col gap-4
                    justify-center items-center
                ">
                    <div className="
                    text-gray-500 text-sm p-4 text-center
                    ">
                        In case you forgot your password, please contact tech support.
                    </div>
                    <Link href={`/signup`} className="
                        text-center
                        text-blue-500
                        cursor-pointer underline
                    ">
                        Do not have an account? Sign up
                    </Link>
                    {buttonContent}
                </div>
            </form>
        </div>
    );
}

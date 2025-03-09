"use client";

import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { FormEvent, useState } from "react";

export default function LogIn() {
    const [isProcessingFetch, setIsProcessingFetch] = useState(false);
    const router = useRouter()

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsProcessingFetch(true);
        const formData = new FormData(e.currentTarget);
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email: formData.get("email"),
            password: formData.get("password")
          }),
        })

        if (response.status.toString()[0] !== "2") {
            // Status is not 200 - add error handling
            console.log("[ERROR] error with login")
            return
        }

        // Add validation to check correct response object
        const responseJson = await response.json()
        const tokenString = responseJson.token

        Cookies.set("jwt", tokenString)

        router.push('/profile')
        setIsProcessingFetch(false);
    }

    const buttonContent = 
        isProcessingFetch ? 
        <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-8 h-8" />
        :
        <div>Log In</div>

    // Add validations for inputs here and in SignUp
    return (
        <div className="
            flex flex-col
            h-115 w-sm
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
                    <input id="emailLogIn" type="text" name="email" placeholder="john_doe@gmail.com" className="border px-1 py-0.5" />
                    <label htmlFor="passwordLogIn">Password:</label>
                    <input id="passwordLogIn" type="password" name="password" placeholder="********" className="border px-1 py-0.5" />
                </div>
                <button type="submit" className="
                    flex justify-center items-center
                    bg-blue-500 text-white
                    hover:bg-blue-600
                    rounded-md shadow-md border-1
                    p-2 w-3xs h-10
                    cursor-pointer
                ">
                    {buttonContent}
                </button>
            </form>
        </div>
    );
}

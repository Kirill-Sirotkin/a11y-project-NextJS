"use client";

import { FormEvent, useState } from "react";

export default function SignUp() {
    const [isProcessingFetch, setIsProcessingFetch] = useState(false);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsProcessingFetch(true);
        const formData = new FormData(e.currentTarget);
        const response = await fetch('http://localhost:3001/auth/register', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email: formData.get("email"),
            password: formData.get("password")
          }),
        })
        setIsProcessingFetch(false);

        console.log(response)
    }

    const buttonContent = 
        isProcessingFetch ? 
        <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-8 h-8" />
        :
        <div>Sign Up</div>
    
    return (
        <div className="
            flex flex-col
            h-115 w-sm
            rounded-lg p-2 shadow-md border-2
        ">
            <div className="text-2xl font-bold">
                Sign up for a new account
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
                    <label htmlFor="emailSignUp">Email:</label>
                    <input id="emailSignUp" type="text" name="email" placeholder="john_doe@gmail.com" className="border px-1 py-0.5" />
                    <label htmlFor="passwordSignUp">Password:</label>
                    <input id="passwordSignUp" type="password" name="password" placeholder="********" className="border px-1 py-0.5" />
                    <label htmlFor="passwordRepeatSignUp">Repeat password:</label>
                    <input id="passwordRepeatSignUp" type="password" name="passwordRepeat" placeholder="********" className="border px-1 py-0.5" />
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
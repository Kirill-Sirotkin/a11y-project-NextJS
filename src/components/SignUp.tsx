"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { FormEvent, useState } from "react";

export default function SignUp() {
    const [isProcessingFetch, setIsProcessingFetch] = useState(false);
    const router = useRouter()

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsProcessingFetch(true);
        const formData = new FormData(e.currentTarget);
        if (formData.get("password") !== formData.get("passwordRepeat")) {
            alert("Repeated password does not match password");
            setIsProcessingFetch(false);
            return;
        }

        try {
            // const response = await fetch('http://localhost:3001/auth-alpha/register', {
            const response = await fetch('https://68.183.13.198:8080/auth-alpha/register', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                email: formData.get("email"),
                password: formData.get("password"),
                passwordRepeat: formData.get("passwordRepeat"),
                alphaKey: formData.get("alphaKey")
              }),
            })
    
            if (response.status.toString()[0] !== "2") {
                // Status is not 200 - add error handling
                console.log("[ERROR] error with signup")
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
            Sign Up
        </button>
    
    return (
        <div className="
            flex flex-col
            h-120 w-sm
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
                    <input id="emailSignUp" type="email" name="email" placeholder="john_doe@gmail.com" className="border px-1 py-0.5" required />
                    <label htmlFor="passwordSignUp">Password:</label>
                    <input id="passwordSignUp" type="password" name="password" placeholder="********" className="border px-1 py-0.5" required />
                    <label htmlFor="passwordRepeatSignUp">Repeat password:</label>
                    <input id="passwordRepeatSignUp" type="password" name="passwordRepeat" placeholder="********" className="border px-1 py-0.5" required />
                    <label htmlFor="alphaKeySignUp">Alpha key:</label>
                    <input id="alphaKeySignUp" type="text" name="alphaKey" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="border px-1 py-0.5" required />
                </div>
                <div className="
                    flex flex-col gap-4
                    justify-center items-center
                ">
                    <Link href={`/login`} className="
                        text-center
                        text-blue-500
                        cursor-pointer underline
                    ">
                        Already have an account? Log in
                    </Link>
                    {buttonContent}
                </div>
            </form>
        </div>
    );
}
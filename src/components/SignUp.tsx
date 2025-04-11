"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
    const [isProcessingFetch, setIsProcessingFetch] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
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
        if (formData.get("password") !== formData.get("passwordRepeat")) {
            alert("Repeated password does not match password");
            setIsProcessingFetch(false);
            return;
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'auth-alpha/register', {
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
    
            if (!response.ok) {
                // Status is not 200 - add error handling
                console.log("[ERROR] error with signup")
                const result = await response.json()
                toast.error("Error with sign up. " + result.message)
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

    const termsWarningMessage = 
        isTermsAccepted ?
        null
        :
        <div className="text-red-500 text-center p-2">
            Please read and accept the <Link href={"/terms"} target="_blank" className="text-blue-500 cursor-pointer underline">terms of service</Link> before signing up
        </div>

    const renderButtonContent = () => {
        if (isProcessingFetch) return (
            <button type="submit" disabled className="
                flex justify-center items-center
                bg-gray-400 text-white
                rounded-md shadow-md border-1
                p-2 w-3xs h-10
            ">
                <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-8 h-8" />
            </button>
        )
        if (!isTermsAccepted) return (
            <button type="submit" disabled className="
                flex justify-center items-center
                bg-gray-400 text-white
                rounded-md shadow-md border-1
                p-2 w-3xs h-10
            ">
                Sign Up
            </button>
        )
        return (
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
        )
    }
    
    return (
        <div className="
            flex flex-col
            h-150 w-sm
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
                    <div className="flex gap-2 px-2">
                        <input id="termsCheckboxSignUp" type="checkbox" name="termsCheckbox" checked={isTermsAccepted} onChange={() => setIsTermsAccepted(!isTermsAccepted)} required />
                        <label htmlFor="termsCheckboxSignUp">I accept the <Link href={"/terms"} target="_blank" className="text-blue-500 cursor-pointer underline">terms of service</Link></label>
                    </div>
                </div>
                <div className="
                    flex flex-col gap-1
                    justify-center items-center
                ">
                    <Link href={`/login`} className="
                        text-center
                        text-blue-500
                        cursor-pointer underline
                    ">
                        Already have an account? Log in
                    </Link>
                    {termsWarningMessage}
                    {renderButtonContent()}
                </div>
            </form>
        </div>
    );
}
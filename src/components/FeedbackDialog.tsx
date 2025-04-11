"use client";

import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Textarea } from "@headlessui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function FeedbackDialog() {
    const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
    const [isProcessingFetch, setIsProcessingFetch] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const MAX_TEXT_LENGTH = 500;

    const handleFeedbackTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length > MAX_TEXT_LENGTH) return;
        setFeedbackText(inputValue)
    }
    const closeDialog = () => {
        setIsFeedbackDialogOpen(false)
    }
    const submitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!confirm("Are you sure you want to submit your feedback?")) {
            console.log("Feedback submit cancelled.")
            return
        }

        setIsProcessingFetch(true)
        const formData = new FormData(e.currentTarget)

        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'feedback', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("jwt")
            },
            body: JSON.stringify({ 
                text: formData.get("feedbackText")
            }),
        })
        if (!res.ok) {
            console.error(`Error submitting feedback: ${res.status} ${res.statusText}`)
            toast.error("[ERROR] could not post the feedback message. Please try again later.")
            setIsProcessingFetch(false)
            return
        }
        const resJson = await res.json()
        toast.success(`${resJson.message}`)
        setFeedbackText("")

        setIsProcessingFetch(false)
        setIsFeedbackDialogOpen(false)
    }

    const renderButton = isProcessingFetch ?
        <Button
            type="submit"
            className="
                inline-flex items-center gap-2 rounded-md bg-gray-500
                py-1.5 px-3 text-sm/6 font-semibold 
                text-white shadow-inner shadow-white/10
            ">
            <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-6 h-6" />
        </Button>
        :
        <Button
            type="submit"
            className="
                inline-flex items-center gap-2 rounded-md bg-blue-500
                py-1.5 px-3 text-sm/6 font-semibold 
                text-white shadow-inner shadow-white/10
                data-[hover]:bg-blue-600 data-[focus]:outline-white data-[focus]:outline-1
            ">
            Submit feedback
        </Button>

    return (    
        <>
            <button type="button" onClick={() => {setIsFeedbackDialogOpen(true)}} className="
                w-30 h-12 sticky left-4 bottom-6
                flex justify-center items-center
                bg-blue-500 text-white
                hover:bg-blue-600
                rounded-lg shadow-md border-1
                p-2 text-sm font-bold
                cursor-pointer
            ">
                Share your feedback!
            </button>
            <Dialog open={isFeedbackDialogOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {}}>
                <DialogBackdrop className="fixed inset-0 bg-black/50" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="
                                w-full max-w-md rounded-xl bg-white/5 relative
                                p-6 backdrop-blur-2xl duration-300 
                                ease-out data-[closed]:transform-[scale(95%)] 
                                data-[closed]:opacity-0 border-2 border-gray-400/20 shadow-lg
                        ">
                            <button onClick={closeDialog} className="
                                flex justify-center items-center absolute
                                bg-gray-600/20
                                hover:bg-gray-600/40
                                rounded-md shadow-md border-1 border-gray-400/80
                                w-7 h-7 p-1 text-sm font-bold
                                cursor-pointer right-2 top-2
                            ">
                                <img src="/images/close.svg" alt="close feedback dialog button" className=""></img>
                            </button>
                            <DialogTitle as="h3" className="text-base/7 text-white font-bold">
                                We appreciate your feedback!
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-white">
                                Your thoughts and suggestions about
                            </p>
                            <ul className="mt-2 text-sm/6 text-white list-disc list-inside">
                                <li>
                                    Functionality and UI of the website
                                </li>
                                <li>
                                    The quality and information of the reports
                                </li>
                                <li>
                                    Your general experience with the website
                                </li>
                            </ul>
                            <p className="mt-2 text-sm/6 text-white">
                                will help us improve the service!
                            </p>
                            <form onSubmit={(e) => submitFeedback(e)} className="mt-4">
                                <Textarea 
                                value={feedbackText}
                                onChange={handleFeedbackTextChange}
                                name="feedbackText"
                                className="
                                    w-full h-32 rounded-lg bg-gray-400/50
                                    p-2 text-sm/6 text-white placeholder:text-gray-400
                                    border-2 border-gray-400/20 shadow-md focus:outline-none focus:ring-2 
                                    focus:ring-white focus:border-transparent
                                "></Textarea>
                                <div className="pr-2 w-full text-right text-white/90">
                                    {feedbackText.length}/{MAX_TEXT_LENGTH}
                                </div>
                                {renderButton}
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>  
    )
}
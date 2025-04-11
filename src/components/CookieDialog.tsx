"use client";

import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieDialog() {
    const [isCookieDialogOpen, setIsCookieDialogOpen] = useState(true);
    const acceptCookies = () => {
        setIsCookieDialogOpen(false)
        Cookies.set("cookie-consent", "true");
    }

    useEffect(() => {
        const cookieConsent = Cookies.get("cookie-consent")
        if (cookieConsent) {
            setIsCookieDialogOpen(false)
        } else {
            setIsCookieDialogOpen(true)
        }
    }, [])
    
    return (      
        <Dialog open={isCookieDialogOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {}}>
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="
                            w-full max-w-md rounded-xl bg-white/5 
                            p-6 backdrop-blur-2xl duration-300 
                            ease-out data-[closed]:transform-[scale(95%)] 
                            data-[closed]:opacity-0 border-2 border-gray-400/20 shadow-lg
                    ">
                    <DialogTitle as="h3" className="text-base/7 text-white font-bold">
                        Cookie Policy
                    </DialogTitle>
                    <p className="mt-2 text-sm/6 text-white">
                        We only use first-party essential cookies to ensure the website functions properly.
                    </p>
                    <div className="mt-4">
                        <Button
                            className="
                                inline-flex items-center gap-2 rounded-md bg-blue-500
                                py-1.5 px-3 text-sm/6 font-semibold 
                                text-white shadow-inner shadow-white/10 focus:outline-none 
                                data-[hover]:bg-blue-600 data-[focus]:outline-1 
                                data-[focus]:outline-white data-[open]:bg-gray-700"
                            onClick={acceptCookies}
                        >
                            Got it, thanks!
                        </Button>
                    </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
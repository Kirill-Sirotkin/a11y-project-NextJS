"use client";

import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function InstructionsDialog(props: { isDialogOpen: boolean, closeDialog: () => void }) {
    return (      
        <Dialog open={props.isDialogOpen} as="div" className="relative z-10 focus:outline-none" onClose={props.closeDialog}>
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
                    <DialogTitle as="h3" className="text-2xl text-white font-bold">
                        Instructions
                    </DialogTitle>
                    <p className="mt-2 text-sm/6 text-white">
                        On this page you can generate an accessibility report for a web page and view the history of your reports.
                    </p>
                    <p className="mt-2 text-md/6 font-bold text-white">
                        1. New report
                    </p>
                    <p className="mt-2 pl-4 text-sm/6 text-white">
                        To create a report, enter the full URL of the web page you want to analyze and click the "Generate report" button.
                    </p>
                    <p className="mt-2 text-sm/6 font-bold text-white">
                        Please note:
                    </p>
                    <p className="mt-2 pl-4 text-sm/6 text-white">
                        - The URL must be full, for example: https://your-website.com OR https://www.your-website.com
                    </p>
                    <p className="mt-2 pl-4 text-sm/6 text-white">
                        - The report generation may take a few seconds up to a minute, depending on the complexity of the web page.
                    </p>
                    <p className="mt-2 text-md/6 font-bold text-white">
                        2. Report history
                    </p>
                    <p className="mt-2 pl-4 text-sm/6 text-white">
                        The report history is listed under "Your reports". Click "View report" to see a PDF file with the detailed information. When viewing the report PDF, you can also download it.
                    </p>
                    <div className="mt-4">
                        <Button
                            className="
                                inline-flex items-center gap-2 rounded-md bg-blue-500
                                py-1.5 px-3 text-sm/6 font-semibold 
                                text-white shadow-inner shadow-white/10 focus:outline-none 
                                data-[hover]:bg-blue-600 data-[focus]:outline-1 
                                data-[focus]:outline-white data-[open]:bg-gray-700"
                            onClick={props.closeDialog}
                        >
                            Close
                        </Button>
                    </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
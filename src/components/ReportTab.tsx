"use client"

import { UserJwtPayload } from "@/models/user-jwt-payload";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";

enum ReportState {
    AwaitingUserInput,
    Generating,
    Displaying
}

export default function ReportTab(props: { jwt: UserJwtPayload }) {
    const [reportState, setReportState] = useState<ReportState>(ReportState.AwaitingUserInput)
    const [reportPath, setReportPath] = useState("");

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setReportState(ReportState.Generating)
        const formData = new FormData(e.currentTarget);

        const response = await fetch('http://localhost:3001/report', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + Cookies.get("jwt")
            },
            body: JSON.stringify({ 
              domain: formData.get("domain")
            }),
        })

        const responseJson = await response.json()
        setReportState(ReportState.Displaying)
        setReportPath(responseJson.fileName)
    }

    const newReport = () => {
        setReportState(ReportState.AwaitingUserInput)
    }

    const renderReport = (state: ReportState) => {
        switch(state) {
            case ReportState.AwaitingUserInput:
                return (
                    <form onSubmit={submit} className="
                        flex flex-col gap-4 justify-center items-center
                        w-full h-full
                    ">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="reportDomain" className="
                                flex justify-center items-center
                            ">
                                Enter full URL:
                            </label>
                            <input id="reportDomain" type="text" name="domain" placeholder="https://example.com" className="border px-1 py-0.5" />
                        </div>
                        <button type="submit" className="
                            flex justify-center items-center
                            bg-blue-500 text-white
                            hover:bg-blue-600
                            rounded-md shadow-md border-1
                            p-2 h-10 w-48 text-sm font-bold
                            cursor-pointer
                        ">
                            GENERATE REPORT
                        </button>
                    </form>)
            
            case ReportState.Generating:
                return (
                    <div className="
                        flex flex-col w-full h-full
                        gap-4 justify-center items-center
                    ">
                        <div className="
                            bg-gray-200 w-16 h-16
                        ">
                            <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-full h-full" />
                        </div>
                        <div className="
                            flex justify-center items-center
                            text-center
                        ">
                            Please wait until the report generation is finished.
                            <br></br>
                            Depending on the complexity of the web page, this may take from a few seconds up to a minute.
                        </div>
                    </div>)
        
            case ReportState.Displaying:
                return (
                    <div className="
                        flex flex-col w-full h-full
                        gap-4 justify-center items-center
                    ">
                        <button onClick={newReport} type="button" className="
                            flex justify-center items-center
                            bg-blue-500 text-white
                            hover:bg-blue-600
                            rounded-md shadow-md border-1
                            p-2 h-10 w-48 text-sm font-bold
                            cursor-pointer
                        ">
                            NEW REPORT
                        </button>
                        <object data={"http://localhost:3001/" + reportPath} type="application/pdf" width="100%" height="100%">
                            <iframe src={"http://localhost:3001/" + reportPath} width="100%" height="100%">
                                This browser does not support PDFs. Please download the PDF to view it: 
                                <a href={"http://localhost:3001/" + reportPath}>Download PDF</a>
                            </iframe>
                        </object>            
                    </div>)
        }
    }

    return (
        <div className="flex w-full h-full">
            {renderReport(reportState)}
        </div>
    );
}
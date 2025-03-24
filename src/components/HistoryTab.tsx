"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Report } from "@/models/report";
import ReportListElement from "./ReportListElement";
import toast from "react-hot-toast";

enum HistoryState {
    Fetching,
    AllReports,
    SingleReport
}

export default function HistoryTab() {
    const [reports, setReports] = useState<Report[]>([])
    const [reportPath, setReportPath] = useState("");
    const [historyState, setHistoryState] = useState<HistoryState>(HistoryState.Fetching)
    const [isProcessingGenerate, setIsProcessingGenerate] = useState(false)

    const fetchReports = () => {
        console.log("fetching history...")

        setHistoryState(HistoryState.Fetching)
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'report', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("jwt")
            },
        })
        .then(async (res) => {
            if (!res.ok) {
                // Status is not 200 - add error handling
                console.log("[ERROR] error with signup")
                // alert("Invalid session token. Please log out and log in again.")
                setHistoryState(HistoryState.AllReports)
                const result = await res.json()
                toast.error("Invalid session token. Please log out and log in again. " + result.message)
                return
            }
            res.json()
            .then((res: Report[]) => {
                if (Array.isArray(res)) {
                    setReports(res)
                }
                setHistoryState(HistoryState.AllReports)
                console.log("fetch done!")
            })
        })
    }

    useEffect(() => {
        fetchReports()
    }, [])

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (!confirm("Are you sure you want to generate a report for " + formData.get("domain") + "?")) {
            console.log("report cancelled.")
            return
        }
        setIsProcessingGenerate(true);
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + 'report', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + Cookies.get("jwt")
            },
            body: JSON.stringify({ 
              domain: formData.get("domain")
            }),
        }).then(async (res) => {
            if (!res.ok) {
                // Status is not 200 - add error handling
                console.log("[ERROR] error with report generation")
                // alert("Report generation failed.")
                const result = await res.json()
                toast.error("Report generation failed. " + result.message, {duration: 7000})
                setIsProcessingGenerate(false);
                return
            }
            res.json()
            .then((res) => {
                console.log(res)
                console.log("generation done!")
                setIsProcessingGenerate(false);
                fetchReports()
            })
        })

        // const response = await fetch('https://localhost:3001/report', {
        //     method: 'POST',
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization": "Bearer " + Cookies.get("jwt")
        //     },
        //     body: JSON.stringify({ 
        //       domain: formData.get("domain")
        //     }),
        // })

        // const responseJson = await response.json()
        // console.log(responseJson)

        setTimeout(() => {
            fetchReports()
        }, 1000);
    }

    const showDetailedReport = (path: string) => {
        setReportPath(path)
        setHistoryState(HistoryState.SingleReport)
    }

    const backToAllReports = () => {
        setHistoryState(HistoryState.AllReports)
    }

    const renderReports = () => {
        if (!reports || reports.length === 0) {
            return (
                <div className="flex items-center gap-2 font-bold pt-4">
                <button onClick={fetchReports} className="
                    flex justify-center items-center
                    bg-blue-500 text-white
                    hover:bg-blue-600
                    rounded-md shadow-md border-1
                    w-7 h-7 p-1 text-sm font-bold
                    cursor-pointer
                ">
                    <img src="/images/refresh.svg" alt="refresh reports button" className=""></img>
                </button>
                    No previous reports available.
                </div>
            )
        } else {
            return (
                <ul className="pt-4">
                    <div className="flex items-center gap-2 font-bold pb-2">
                        <button onClick={fetchReports} className="
                            flex justify-center items-center
                            bg-blue-500 text-white
                            hover:bg-blue-600
                            rounded-md shadow-md border-1
                            w-7 h-7 p-1 text-sm font-bold
                            cursor-pointer
                        ">
                            <img src="/images/refresh.svg" alt="refresh reports button" className=""></img>
                        </button>
                        Your reports:
                    </div>
                    {reports.map((report, i) => {
                        return (
                            <ReportListElement key={i} report={report} index={i} detailReportFunction={showDetailedReport} />
                        )
                    })}
                </ul>)
        }
    }

    const generateButton = 
        isProcessingGenerate ?
        <button type="submit" disabled className="
            flex justify-center items-center
            bg-gray-400 text-white
            rounded-md shadow-md border-1
            p-2 h-10 w-48 text-sm font-bold
            cursor-pointer
        ">
            <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-8 h-8" />
        </button>
        :
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

    const renderHistory = (state: HistoryState) => {
        switch(state) {
            case HistoryState.Fetching:
                return (
                    <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-16 h-16" />)
            case HistoryState.AllReports:
                return (
                    <div>
                        <form onSubmit={submit} className="
                            flex flex-col gap-4
                            w-full h-full pb-4 border-b-2 border-black
                        ">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="reportDomain" className="
                                    
                                ">
                                    Enter full URL of the page you want to analyze:
                                </label>
                                <input id="reportDomain" type="text" name="domain" placeholder="https://example.com" className="border px-1 py-0.5 w-112" />
                            </div>
                            {generateButton}
                            <div className="
                            text-gray-500 text-sm
                            ">
                                Please note that report generation may take a little while, depending on the complexity of the website.
                                <br></br>
                                If the status of a new report does not change for longer than 30 seconds, please refresh the reports.
                            </div>
                        </form>
                        {renderReports()}
                    </div>
                )
            case HistoryState.SingleReport:
                return (
                    <div className="
                        flex flex-col w-full h-full
                        gap-4 justify-center
                    ">
                        <button onClick={backToAllReports} type="button" className="
                            flex justify-center items-center
                            bg-blue-500 text-white
                            hover:bg-blue-600
                            rounded-md shadow-md border-1
                            p-2 h-10 w-48 text-sm font-bold
                            cursor-pointer
                        ">
                            Back to reports
                        </button>
                        <object data={process.env.NEXT_PUBLIC_SERVER_URL + reportPath} type="application/pdf" width="100%" height="100%">
                            <iframe src={process.env.NEXT_PUBLIC_SERVER_URL + reportPath} width="100%" height="100%">
                                This browser does not support PDFs. Please download the PDF to view it: 
                                <a href={process.env.NEXT_PUBLIC_SERVER_URL + reportPath}>Download PDF</a>
                            </iframe>
                        </object>            
                    </div>)
        }
    }

    return (
        <div className="w-full h-full">
            {renderHistory(historyState)}
        </div>
    );
}
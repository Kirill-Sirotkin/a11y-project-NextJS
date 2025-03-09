"use client"

import { UserJwtPayload } from "@/models/user-jwt-payload";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Report } from "@/models/report";
import ReportListElement from "./ReportListElement";

enum HistoryState {
    Fetching,
    AllReports,
    SingleReport
}

export default function HistoryTab(props: { jwt: UserJwtPayload }) {
    const [reports, setReports] = useState<Report[]>([])
    const [reportPath, setReportPath] = useState("");
    const [historyState, setHistoryState] = useState<HistoryState>(HistoryState.Fetching)

    useEffect(() => {
        console.log("fetching history...")
        fetch('http://localhost:3001/report', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get("jwt")
            },
        })
        .then((res) => res.json())
        .then((res: Report[]) => {
            setReports(res)
            setHistoryState(HistoryState.AllReports)
            console.log("fetch done!")
        })
    }, [])

    const showDetailedReport = (path: string) => {
        setReportPath(path)
        setHistoryState(HistoryState.SingleReport)
    }

    const backToAllReports = () => {
        setHistoryState(HistoryState.AllReports)
    }

    const renderHistory = (state: HistoryState) => {
        switch(state) {
            case HistoryState.Fetching:
                return (
                    <img src="/images/spinner_dark.svg" alt="processing fetch spinner" className="w-8 h-8" />)
            case HistoryState.AllReports:
                return (
                    <ul>
                        {reports.map((report, i) => {
                            return (
                                <ReportListElement key={i} report={report} index={i} detailReportFunction={showDetailedReport} />
                            )
                        })}
                    </ul>)
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
                            Back to report history
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
        <div className="w-full h-full">
            {renderHistory(historyState)}
        </div>
    );
}
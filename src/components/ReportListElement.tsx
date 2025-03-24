import { Report } from "@/models/report";

export default function ReportListElement(props: { report: Report, index: number, detailReportFunction: (path: string) => void }) {
    
    const getDateStringFromDatetime = (datetime: string) => {
        const date = new Date(datetime)
        return "" + date.getHours().toString() + ":" +
            date.getMinutes().toString() + ":" +
            date.getSeconds().toString() + " " +
            date.getDate().toString() + "." +
            (date.getMonth() + 1).toString() + "." +
            date.getFullYear().toString()
    }

    const renderStatusStringWithColor = (status: string) => {
        if (status === "PENDING") return (
            <div className="text-amber-300">
                {status}
            </div>
        )
        if (status === "COMPLETED") return (
            <div className="text-emerald-600">
                {status}
            </div>
        )
        if (status === "FAILED") return (
            <div className="text-red-600">
                {status}
            </div>
        )
    }

    const renderButton = (status: string) => {
        if (status === "PENDING") return (
            <button onClick={() => {props.detailReportFunction(props.report.fileName)}} disabled type="button" className="
                flex justify-center items-center
                bg-gray-400 text-white
                rounded-md shadow-md border-1
                p-2 h-10 w-48 text-sm font-bold
                cursor-pointer
            ">
                View report
            </button>
        )
        if (status === "COMPLETED") return (
            <button onClick={() => {props.detailReportFunction(props.report.fileName)}} type="button" className="
                flex justify-center items-center
                bg-blue-500 text-white
                hover:bg-blue-600
                rounded-md shadow-md border-1
                p-2 h-10 w-48 text-sm font-bold
                cursor-pointer
            ">
                View report
            </button>
        )
    }

    return (
        <li key={props.index} className="
            flex gap-6 mb-2 justify-between items-center
            border-1 p-2 border-gray-400 rounded-sm shadow-md
        ">
            <div className="
                flex justify-start items-center gap-2
            ">
                <div className="w-52">
                    {getDateStringFromDatetime(props.report.createdAt)}
                </div>
                <div className="overflow-y-auto w-128 p-0.5 h-8">
                    {props.report.domain}
                </div>
            </div>
            <div className="
                flex justify-center items-center gap-6
            ">
                <div>
                    {renderStatusStringWithColor(props.report.status)}
                </div>
                {renderButton(props.report.status)}
            </div>
        </li>
    );
}
import { Report } from "@/models/report";

export default function ReportListElement(props: { report: Report, index: number, detailReportFunction: Function }) {
    
    const getDateStringFromDatetime = (datetime: string) => {
        const date = new Date(datetime)
        return "" + date.getHours().toString() + ":" +
            date.getMinutes().toString() + ":" +
            date.getSeconds().toString() + " " +
            date.getDate().toString() + "." +
            (date.getMonth() + 1).toString() + "." +
            date.getFullYear().toString()
    }

    const getStatusStringWithColor = (status: string) => {
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
    }

    return (
        <li key={props.index} className="
            flex gap-6 mb-2 justify-between items-center
            border-1 border-gray-400 rounded-sm
        ">
            <div>
                {getDateStringFromDatetime(props.report.createdAt)}
            </div>
            <div>
                {props.report.domain}
            </div>
            <div>
                {getStatusStringWithColor(props.report.status)}
            </div>
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
        </li>
    );
}
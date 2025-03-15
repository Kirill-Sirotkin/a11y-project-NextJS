"use client";

import { UserJwtPayload } from "@/models/user-jwt-payload";
import { TabGroup, TabPanels, TabList, Tab, TabPanel } from "@headlessui/react";
import HistoryTab from "./HistoryTab";
import Link from "next/link";
import Cookies from 'js-cookie';

export default function ProfileWithTabs(props: { jwt: UserJwtPayload }) {
    return (
        <div className="h-full flex flex-col">
            <div className="
                flex gap-8 justify-end
                p-2 m-2 text-3xl border-b-2
            ">
                <div>
                    {props.jwt.email}
                </div>
                <Link href={"/login"} onClick={() => Cookies.set("jwt", "")} type="button" className="
                    flex justify-center items-center
                    bg-blue-500 text-white
                    hover:bg-blue-600
                    rounded-md shadow-md border-1
                    px-8 py-2 h-10 text-xl
                    cursor-pointer
                ">
                    Log Out
                </Link>
            </div>
            <TabGroup className="
                flex flex-1 gap-4
                p-4
            ">
            <TabList className="
                flex flex-col
                text-2xl border-r-2
            ">
                {/* <Tab className="flex justify-start">Report</Tab> */}
                <Tab className="flex justify-start data-[selected]:bg-gray-300 w-full pl-4 pr-8 pt-4 pb-4">Reports</Tab>
                <Tab className="flex justify-start data-[selected]:bg-gray-300 w-full pl-4 pr-8 pt-4 pb-4">Settings</Tab>
            </TabList>
            <TabPanels className="
                text-xl w-full
            ">
                {/* <TabPanel className="flex w-full h-full">
                    <ReportTab jwt={props.jwt} />
                </TabPanel> */}
                <TabPanel className="flex w-full h-full">
                    <HistoryTab jwt={props.jwt} />
                </TabPanel>
                <TabPanel className="
                    flex flex-col gap-4
                ">
                    <div>Email: {props.jwt.email}</div>
                    <div>Name: {props.jwt.name ? props.jwt.name : "-"}</div>
                    <div>Role: {props.jwt.role}</div>
                    <div>Subscription: {props.jwt.subscription}</div>
                    <div className="
                        mt-8 font-bold
                    ">
                        Settings page functionality is not yet available in the alpha version.
                    </div>
                </TabPanel>
            </TabPanels>
            </TabGroup>
        </div>
    );
}
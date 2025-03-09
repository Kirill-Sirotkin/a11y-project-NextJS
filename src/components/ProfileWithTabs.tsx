"use client";

import { UserJwtPayload } from "@/models/user-jwt-payload";
import { TabGroup, TabPanels, TabList, Tab, TabPanel } from "@headlessui/react";
import ReportTab from "./ReportTab";
import HistoryTab from "./HistoryTab";

export default function ProfileWithTabs(props: { jwt: UserJwtPayload }) {
    return (
        <div className="h-full flex flex-col">
            <div className="
                flex gap-16
                p-2 m-2 text-3xl border-b-2
            ">
                <div>
                    {props.jwt.email}
                </div>
                <div className="lowercase font-bold">
                    {props.jwt.role}
                </div>
            </div>
            <TabGroup className="
                flex flex-1 gap-4
                p-4
            ">
            <TabList className="
                flex flex-col gap-8
                pl-4 pr-8 text-2xl border-r-2
            ">
                <Tab className="flex justify-start">Report</Tab>
                <Tab className="flex justify-start">History</Tab>
                <Tab className="flex justify-start">Settings</Tab>
            </TabList>
            <TabPanels className="
                text-xl w-full
            ">
                <TabPanel className="flex w-full h-full">
                    <ReportTab jwt={props.jwt} />
                </TabPanel>
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
                </TabPanel>
            </TabPanels>
            </TabGroup>
        </div>
    );
}
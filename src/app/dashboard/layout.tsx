import { ReactNode } from "react";
import DashboardHeader from "./components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

const DashboardLayout = async({ children }: { children : ReactNode })=>{
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/");
    }

    return (
        <>
            <DashboardHeader />
            {children}
            <ToastContainer autoClose={3000} position="top-right" />
        </>
    )
}

export default DashboardLayout;
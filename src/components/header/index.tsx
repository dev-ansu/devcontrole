"use client";
import Link from "next/link";
import { Loader, Lock, LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = ()=>{
    const { status, data } = useSession();

    const handleLogin = async ()=>{
        await signIn();
    }

    const handleLogout = async()=>{
        await signOut();
    }

    return (

        <>
            <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
                <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
                    <Link href="/">
                        <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
                            <span className="text-blue-500">DEV</span> CONTROLE
                        </h1>
                    </Link>

                    {status === 'loading' && (
                        <button className="animate-spin">
                            <Loader size={26} color="#4b5563" />
                        </button>
                    )}

                    {status === "unauthenticated" && (
                        <button className="cursor-pointer" onClick={handleLogin}>
                            <Lock size={26} color="#4b5563" />
                        </button>
                    )}
                    
                    {status === "authenticated" && (
                        <div className="flex items-baseline gap-3">
                        <Link href="/dashboard">
                            <User size={26} color="#4b5563" />
                        </Link>

                        <button className="cursor-pointer" onClick={handleLogout}>
                            <LogOut size={26} color="#4b5563" />
                        </button>
                    </div>
                    )}

                    
                </div>
            </header>
        </>

    )            
}


export default Header;
    
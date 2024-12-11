'use client'
import React, { FormEvent } from "react"
import Login from "@/components/auth/signin"
import Header from "@/components/auth/header"

export default function LoginPage() { 
    return (
        <div className="flex items-stretch mt-40 w-full justify-center">
            <div className="mr-40">
                <h1 className="text-9xl font-extrabold text-gray-900">
                    SCRUM.IO
                </h1>
                <h2 className="text-4xl font-medium text-gray-600">
                    Your Agile Copilot.
                </h2>
                <div className="flex h-6 mt-4">
                    <div className="bg-sky-950 h-full w-1/4 rounded-l-md"></div>
                    <div className="bg-sky-600 h-full w-1/4"></div>
                    <div className="bg-sky-400 h-full w-1/4"></div>
                    <div className="bg-sky-200 h-full w-1/4 rounded-r-md"></div>
                </div>
            </div>
            <div className="ml-40">
                <Header
                    heading="Sign in, scrum master!"
                    paragraph="Don't have an account yet?"
                    linkName="Sign up"
                    linkUrl="/auth/signup"
                ></Header>
                <Login></Login>
            </div>
            
        </div>
    )
}

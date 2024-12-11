'use client'
import React from "react";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/auth/signin")

    }, [user])

    return <h1>Only logged in users can view.</h1>
}
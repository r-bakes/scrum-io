'use client'

import Layout from "@/components/core/projects/layout";
import { DataContextProvider } from "@/context/data/dataContext";

export default function Projects({ 
    children 
} : {
    children: React.ReactNode
}) {
    return (
        <DataContextProvider>
            <Layout></Layout>
        </DataContextProvider>
    )
}




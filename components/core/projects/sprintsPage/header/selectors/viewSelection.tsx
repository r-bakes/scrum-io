import React, { useState } from "react"

const fixedButtonClass = "h-10 w-full pl-6 text-base text-left hover:bg-gray-600 text-gray-200 "

export default function ViewSelection({
    onClick
} : {
    onClick : React.MouseEventHandler<HTMLButtonElement>
}) {
    const [selectedViewId, setSelectedViewId] = useState("Sprints")
    const ifSelected = (viewId: string): string => { return viewId === selectedViewId ?  "font-bold border-l-2 border-white" : "font-normal"}
    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setSelectedViewId(e.target.id)
        onClick(e.target.id)
    }

    function MenuItem({option, d} : {option : string, d : string}) {
        return (
            <button onClick={handleClick} id={option} className={fixedButtonClass + ifSelected(option)}>
                <div className="flex pointer-events-none">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                    </svg>
                    <div className="pl-4">
                        {option}
                    </div>
                </div>
            </button>   
        )
    }

    return (
        <div className='w-52  border-r bg-sky-950 flex flex-col'>
            <div className='px-6 border-b border-gray-600 '>
                <div className='py-4'>
                    <h1 className='text-3xl font-extrabold text-gray-200'>SCRUM.IO</h1>
                    <h2 className='text-base font-medium text-gray-200'>Your Agile Copilot.</h2>
                </div>
            </div>
            <div className='text-gray-100 text-sm pt-4'>
                <div className='pb-2 px-6'>
                    <label className="text-xs font-extralight">Views</label>
                </div>
                <div className='flex-col pt-2 overflow-y-auto'>
                    <ul>
                        <MenuItem option="Epics" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"></MenuItem>
                        <MenuItem option="Sprints" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"></MenuItem>
                        <MenuItem option="Backlog" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></MenuItem>
                        <MenuItem option="Calendar" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></MenuItem>
                        <MenuItem option="Team" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></MenuItem>
                    </ul>
                </div>
            </div>
        </div>
    )
}
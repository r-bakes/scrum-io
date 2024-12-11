const fixedButtonClass = "w-1/2 hover:bg-gray-100 py-1 px-1" 

export default function ActionButtons({
    id,
    onGenerate,
    onCopy,
    onDelete,
} : {
    id: string,
    onGenerate: React.MouseEventHandler<HTMLButtonElement>,
    onCopy: React.MouseEventHandler<HTMLButtonElement>,
    onDelete: React.MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <div className="flex align-middle justify-end w-full h-full">
            <button className={fixedButtonClass} onClick={() => onCopy(id)}>
                <div className="flex align-middle justify-center">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                </div>
            </button>
            <button className={fixedButtonClass + "rounded-r-md hover:rounded-r-md"} onClick={() => onDelete(id)}>
                <div className="flex align-middle justify-center">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
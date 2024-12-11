const fixedButtonClass = "w-1/2 font-light px-2 py-2 h-10 align-middle "

export default function ExportButton({
    onClick
} : {
    onClick : React.MouseEvent<HTMLButtonElement>
}) {
    return (
        <button onClick={onClick} className={fixedButtonClass + "rounded-md hover:bg-gray-100 hover:rounded-md"}>
            <div className="flex align-middle justify-center">
                <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                </svg>
            </div>
        </button>
    )
}
const fixedButtonClass = "font-medium w-full font-light px-2 text-gray-700 py-2 h-10 align-middle hover:bg-gray-100 "

export default function ImportButton({
    onOpen
} : {
    onOpen : React.MouseEvent<HTMLButtonElement>
}) {
    return (
        <div className="w-1/3 h-10 border-t border-l">
            <button className={fixedButtonClass} onClick={onOpen}>
                <div className="flex h-full w-full justify-center">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
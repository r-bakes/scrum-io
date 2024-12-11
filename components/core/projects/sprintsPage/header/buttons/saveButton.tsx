const fixedButtonClass = "w-1/2 font-light px-2 py-2 h-10 align-middle "

export default function SaveButton({
    onClick
} : {
    onClick : React.MouseEvent<HTMLButtonElement>
}) {
    return (
        <button onClick={onClick} className={fixedButtonClass + "rounded-md hover:bg-gray-100 hover:rounded-md"}>
            <div className="flex align-middle justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                </svg>
            </div>
        </button>
    )
}
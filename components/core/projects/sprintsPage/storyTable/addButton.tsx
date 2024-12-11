const fixedButtonClass = "font-medium w-full font-light px-2 text-gray-700 py-2 h-10 align-middle hover:bg-gray-100 "

export default function AddButton({
    onClick
} : {
    onClick : React.MouseEvent<HTMLButtonElement>
}) {
    return (
        <div className="w-1/3 h-10 border-t border-r">
            <button onClick={onClick} className={fixedButtonClass}>
                <div className="flex h-full w-full justify-center">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
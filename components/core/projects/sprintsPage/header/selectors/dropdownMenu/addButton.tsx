const fixedButtonClass = "font-medium w-full font-light px-2 text-gray-700 py-2 h-10 align-middle hover:bg-gray-100 hover:rounded-md"

export default function AddButton({
    onClick
} : {
    onClick : React.MouseEvent<HTMLButtonElement>
}) {
    return (
        <div className="flex w-full h-full mt-2 border-t">
            <button onClick={onClick} className={fixedButtonClass}>
                <div className="flex align-middle justify-center">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
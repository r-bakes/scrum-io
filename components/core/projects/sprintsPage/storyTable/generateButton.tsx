const fixedButtonClass = "font-medium w-full font-light px-2 text-gray-700 py-2 h-10 align-middle hover:bg-gray-100 "

export default function GenerateButton({
    onClick
} : {
    onClick : React.MouseEvent<HTMLButtonElement>
}) {
    return (
        <div className="w-1/3 h-10 border-t border-l border-r">
            <button className={fixedButtonClass + "rounded-l-md hover:rounded-l-md"}>
                <div className="flex align-middle justify-center">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
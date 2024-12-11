const fixedInputContainer= "rounded-md appearance-none my-3 relative block w-full h-8 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
const fixedInputClass = "rounded-md font-extralight appearance-none block w-full h-full pl-8 pr-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"

export default function SearchBar({
    handleChange,
    value
} : {
    handleChange : React.FormEvent<HTMLInputElement>
    value : string
}) {
    return (
        <div className={fixedInputContainer}>
                <div className="absolute top-1.5 left-2">
                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            <input value={value} className={fixedInputClass} onChange={handleChange} type="search"></input>
        </div>
    )
}
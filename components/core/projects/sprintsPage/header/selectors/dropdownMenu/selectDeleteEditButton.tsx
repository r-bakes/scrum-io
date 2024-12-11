const fixedButtonClassSelect = "w-3/4 px-2 text-left text-gray-700 py-2 h-10 hover:bg-gray-100 hover:rounded-l-md"
const fixedButtonClassSelectWithoutEdit = "w-10/12 px-2 text-left text-gray-700 py-2 h-10 hover:bg-gray-100 hover:rounded-l-md"
const fixedButtonClassEdit = "w-1/2 text-gray-700 py-2 h-10 hover:bg-gray-100"
const fixedButtonClassDelete = "w-1/2 text-gray-700 py-2 h-10 hover:bg-gray-100 hover:rounded-r-md"
const fixedButtonClassDeleteWithoutEdit = "w-full text-gray-700 py-2 h-10 hover:bg-gray-100 hover:rounded-r-md"

export default function SelectDeleteEditButton({
    id,
    option,
    selectedOption,
    onSelect,
    onEdit,
    onDelete
} : {
    id: string
    option : string,
    selectedOption: string,
    onSelect : React.MouseEvent<HTMLButtonElement>
    onDelete : React.MouseEvent<HTMLButtonElement>
    onEdit?: React.MouseEvent<HTMLButtonElement>
}) {
    const ifSelected = (option : string ) : string => {return option === selectedOption ? " border-l-2 border-gray-700 font-medium" : " font-light" }
    
    const FormatButtonWithEdit = (onEdit : React.MouseEvent<HTMLButtonElement>) => {
        return (
            <div className="flex w-1/4">
                <button onClick={onEdit} className={fixedButtonClassEdit}>
                    <div className="flex align-middle justify-center">
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>                
                    </div>
                </button>
                <button onClick={() => onDelete(id)} className={fixedButtonClassDelete}>
                    <div className="flex align-middle justify-center">
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </div>
                </button>
            </div>
        )

    }
    const FormatButtonWithoutEdit = () => {
        return (
            <div className="flex w-2/12">
                <button onClick={() => onDelete(id)} className={fixedButtonClassDeleteWithoutEdit}>
                    <div className="flex align-middle justify-center">
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </div>
                </button>
            </div>
        )
    }

    return (
        <div className="flex shrink-0 w-full">
            <button onClick={() => onSelect(id)} className={(onEdit ? fixedButtonClassSelect : fixedButtonClassSelectWithoutEdit) + ifSelected(option)}>{option}</button>
            {onEdit ? FormatButtonWithEdit(onEdit) : FormatButtonWithoutEdit()}
        </div>
    )
}
import { useState } from "react"
import AddButton from "@/components/core/projects/sprintsPage/header/selectors/dropdownMenu/addButton"
import SelectDeleteEditButton from "./selectDeleteEditButton"
import SearchBar from "./searchBar"

const fixedDropdownClassLarge = "flex text-5xl text-left font-extrabold text-gray-700 mb-3 pr-2"
const fixedDropdownClassSmall = "flex text-3xl text-left font-medium text-gray-700 block mb-3 pr-2"

const fixedDropdownMenuClassLarge = "absolute text-baseline text-gray-700 text-left font-medium rounded-md b py-2 my-3 px-4 border border-gray-300 bg-white top-10 max-h-96 min-h-42 w-72 shadow-md"
const fixedDropdownMenuClassSmall = "absolute text-baseline text-gray-700 text-left font-medium rounded-md b py-2 my-3 px-4 border border-gray-300 bg-white top-24 max-h-96 min-h-42 w-72 shadow-md"

export default function DropdownMenu({
    size,
    options,
    selected,
    onSelect,
    onEdit,
    onAdd,
    onDelete
} : {
    size: "sm" | "lg",
    options: string[][]
    selected: string[],
    onSelect: React.MouseEventHandler<HTMLButtonElement>,
    onEdit?: React.MouseEventHandler<HTMLButtonElement>,
    onAdd: React.MouseEventHandler<HTMLButtonElement>,
    onDelete: React.MouseEventHandler<HTMLButtonElement>,
}) {
    const [isOpen, setIsOpen] = useState(false)
    

    const style = (size === "sm" ? fixedDropdownClassSmall : fixedDropdownClassLarge)
    const dropdownIconSize = (size === "sm" ? "24" : "36")

    
    return (
        <div className="w-full h-full">
            <div className="flex w-full">               
                <button onClick={() => setIsOpen(!isOpen)} className={style}>
                    <div className="flex pointer-events-none">
                        {size === "lg" ? selected[0].toUpperCase() : selected[0].toLowerCase()}
                        <div className="pt-2 pl-2">
                            <svg fill="none" stroke="currentColor" strokeWidth={1.5} width={dropdownIconSize} height={dropdownIconSize} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </div>
                    </div>
                </button>
            </div>
            {isOpen ?  <Dropdown onSelect={onSelect} onAdd={onAdd} onDelete={onDelete} onEdit={onEdit} setIsOpen={setIsOpen} options={options} selected={selected} size={size}></Dropdown> : <div></div>}
        </div>
    )
}

function Dropdown({
    size,
    options,
    selected,
    setIsOpen,
    onSelect,
    onEdit,
    onAdd,
    onDelete
} : {
    size : "sm" | "lg",
    options: string[][],
    selected: string[]
    setIsOpen: React.MouseEventHandler<HTMLButtonElement>,
    onSelect: React.MouseEventHandler<HTMLButtonElement>,
    onEdit?: React.MouseEventHandler<HTMLButtonElement>,
    onAdd: React.MouseEventHandler<HTMLButtonElement>,
    onDelete: React.MouseEventHandler<HTMLButtonElement>
}) {
    const [searchInput, setSearchInput] = useState("")

    const style = (size === "sm" ? fixedDropdownMenuClassSmall : fixedDropdownMenuClassLarge)

    const handleDelete = (id : string) => {
        setSearchInput("")
        onDelete(id)
    }

    const formatDropdownItems = () => {
            const filteredOptions = options.map((option) => 
                option[0].toLowerCase().includes(searchInput.toLowerCase()) || selected[1] === option[1] ? 
                <SelectDeleteEditButton key={option[1]} id={option[1]} selectedOption={selected[0].toLowerCase()} option={option[0].toLowerCase()} onDelete={handleDelete} onSelect={onSelect} onEdit={onEdit}></SelectDeleteEditButton>
                : <div key={option[1]}></div>)            
    
        return (
            <div className="flex flex-col grow basis-10 w-full align-top overflow-y-scroll max-h-60">
                {filteredOptions}
            </div>
        )
    }

    const handleSearch = (e :  React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    }

    return (
        <div className={style} onMouseLeave={() => setIsOpen(false)}>
            <label className="block text-sm font-extralight px-2 h-5">Select an option.</label>
            <SearchBar value={searchInput} handleChange={handleSearch}></SearchBar>
            {formatDropdownItems()}
            <AddButton onClick={onAdd}></AddButton>
        </div>
    )
}


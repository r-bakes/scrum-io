import { StoryTemplate } from "@/constants/templateData";

const fixedButtonClass = "flex px-1 text-gray-800 items-center font-light text-sm w-full h-full py-2 focus:bg-gray-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 hover:bg-gray-100 text-sm "


export default function StoryTemplateRow({
  template,  
  onSelect
} : {
  template: StoryTemplate,
  onSelect: Function
}) {
  return (
    <tr className="h-10 text-left align-middle">
      <td>
        <button onClick={() => onSelect(template)} className={fixedButtonClass}>
            <div className="flex align-middle justify-center px-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
            <span className="px-4">
              {template.shortTitle}
            </span>
        </button>  
      </td>
      <td>
        <div className="flex">
          {template.tags.map(tag => <div className="shadow-md text-sm font-light px-2 bg-blue-200 rounded-md py-1 mx-1">{tag}</div>)}
        </div>
      </td>
    </tr>
  )
}
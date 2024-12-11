import { Story } from "@/constants/userData"
import { useDataContext } from "@/context/data/dataContext"

const fixedButtonClassAdd = "shadow-sm font-medium w-full font-light px-2 text-gray-700 h-full align-middle hover:bg-gray-100 "
const fixedButtonClassDelete = "w-1/12 text-gray-700 py-2 h-10 hover:bg-gray-100 border-l "
const fixedInputClass = "flex w-11/12 px-3 py-2 text-gray-700 font-light bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 text-sm font-extralight focus:ring-sky-500 focus:border-sky-500 "

// const fixedInputClass="font-normal rounded-md appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm "

export function Tasks ({
    story
} : {
    story: Story
}) {
    const { getTasksByStoryId, updateTask, addTask, deleteTask } = useDataContext()

    const tasks = getTasksByStoryId(story.id)

    const handleUpdateTask = (e: React.FormEvent<HTMLInputElement>) => {
        const task = tasks.find(task => task.id == e.target.id)
        task.title = e.target.value
        updateTask(task)
    }
    
    return (
        <div className="flex flex-col h-full w-full">
            <label className="font-extralight text-s pt-2 pb-1">Tasks</label>
            <div className="flex flex-col overflow-y-auto h-80">
                <ul id="acceptance-criteria-field ">
                    {
                        tasks.map((task) => 
                        <li className="flex">
                            <input key={task.id} id={task.id} onChange={handleUpdateTask} className={fixedInputClass} value={task.title}></input>
                            <button onClick={() => deleteTask(story.id, task.id)} className={fixedButtonClassDelete}>
                                <div className="flex align-middle justify-center">
                                    <svg fill="none" stroke="currentColor" strokeWidth={1.5} height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                            </button>
                        </li>)
                    }
                </ul>
                <div className="w-full h-8 border-t self-end">
                    <button onClick={() => addTask(story.id)} className={fixedButtonClassAdd}>
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full" height={16} width={16} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    )

}
import { MouseEventHandler } from "react"

export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
} : {
    handleSubmit: MouseEventHandler,
    type: String,
    action: String,
    text: String
}) {
    return(
        <div>
            {
                type==="Button" ?
                <button
                    type={action}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mt-10"
                    onClick={handleSubmit}>{text}
                </button> :
                <></>
            }

        </div>
    )
}
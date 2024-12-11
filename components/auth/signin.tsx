import { useState } from "react";
import { loginFields } from "@/constants/formFields";
import Input from "./input";
import signIn from "@/firebase/auth/signin";
import FormExtra from "./formExtra";
import FormAction from "./formAction";
import { useRouter } from "next/navigation";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState)
    const router = useRouter()

    const handleChange = ( e : InputEvent ) => {
        setLoginState({...loginState, [e.target.id]:e.target.value})
    }

    const handleSubmit = ( e : SubmitEvent ) => {
        e.preventDefault()
        authenticateUser()
    }

    const authenticateUser = async () => {
        const { result, error } = await signIn(
            loginState["email-address"],
            loginState["password"]
        )
        if (error) {
            return console.log(error)
        }
        console.log(result)
        return router.push("/")
    }

    return (
        <form className="mt-8 space-y-6">
            <div>
                {  
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}>
                        </Input>
                    )
                }
                <FormExtra></FormExtra>
                <FormAction handleSubmit={handleSubmit} text="Sign In"></FormAction>
            </div>
        </form>


    )
}


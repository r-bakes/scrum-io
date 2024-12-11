import Link from "next/link"
export default function FormExtra() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input
                    id="remember me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded">
                </input>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember Me
                </label>
            </div>
            <div className="text-sm">
                <Link href="#" className="font-medium text-sky-600 hover:text-sky-500">
                    Forgot your password?
                </Link>
            </div>
        </div>
    )
}
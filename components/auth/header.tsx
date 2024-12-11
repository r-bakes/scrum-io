import Link from "next/link"
export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="/"
} : {
    heading: string,
    paragraph: string,
    linkName: string,
    linkUrl: string
}) {
        return (
            <div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    {heading}
                </h2>
                <p className="text-center text-sm text-gray-600 mt-5">
                    {paragraph} {' '}
                    <Link href={linkUrl} className="font-medium text-sky-600 hover:text-sky-500">
                        {linkName}
                    </Link>
                </p>
            </div>
        )
}
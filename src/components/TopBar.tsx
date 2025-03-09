import Link from "next/link";

export default async function TopBar() {
    return (
        <header className="
            flex justify-end
            p-4
        ">
            <Link href={`/auth`} className="
                px-4 py-2
                bg-blue-500 text-white
                rounded-md shadow-md
                hover:bg-blue-600
                cursor-pointer
            ">
                Sign up / Log in
            </Link>
        </header>
    );
}

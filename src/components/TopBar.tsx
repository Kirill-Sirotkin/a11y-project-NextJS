import Link from "next/link";

export default async function TopBar() {
    return (
        <header className="
            flex justify-end gap-4
            p-4
        ">
            <Link href={`/signup`} className="
                px-4 py-2 w-24 text-center
                bg-blue-500 text-white
                rounded-md shadow-md
                hover:bg-blue-600
                cursor-pointer
            ">
                Sign up
            </Link>
            <Link href={`/login`} className="
                px-4 py-2 w-24 text-center
                bg-blue-500 text-white
                rounded-md shadow-md
                hover:bg-blue-600
                cursor-pointer
            ">
                Log in
            </Link>
        </header>
    );
}

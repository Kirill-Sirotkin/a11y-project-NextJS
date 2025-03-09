import Link from "next/link";

export default async function ErrorNotFound() {
    return (
        <main className="
            flex flex-col justify-center items-center
            h-full
        ">
            <div className="
                text-8xl font-bold
            ">
                404
            </div>
            <div className="
                text-3xl mt-4
            ">
                Something went wrong
            </div>
            <Link href="/" className="
                text-md font-extrabold underline cursor-pointer
                mt-12
            ">
                BACK TO HOME PAGE
            </Link>
        </main>
    );
}
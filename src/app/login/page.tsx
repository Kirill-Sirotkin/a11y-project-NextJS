import LogIn from "@/components/LogIn";
import Link from "next/link";

export default async function Login() {
    return (
      <div className="
        flex flex-col
        h-full
      ">
        <Link href="/" className="
          pl-4 pt-4 underline font-bold text-xl cursor-pointer
        ">
          Back to home page
        </Link>
        <main className="
          flex flex-1 justify-center items-center gap-16
          h-full
        ">
          <LogIn />
        </main>
      </div>
    );
  }
  
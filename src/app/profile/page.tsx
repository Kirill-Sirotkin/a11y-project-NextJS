import ErrorNotFound from "@/components/ErrorNotFound";
import ProfileWithTabs from "@/components/ProfileWithTabs";
import { UserJwtPayload } from "@/models/user-jwt-payload";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function Profile() {
  const cookieStore = cookies()
  const jwtCookie = (await cookieStore).get('jwt')
  if (!jwtCookie) {
    return (
        <ErrorNotFound />
    );
  }
  const jwt = jwtDecode<UserJwtPayload>(jwtCookie.value)
  
  return (
    <main className="
      h-full
    ">
      <ProfileWithTabs jwt={jwt} />
    </main>
  );
}
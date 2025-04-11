import Link from "next/link";

export default async function Terms() {
  return (
    <main className="
      flex flex-col
    ">
        <Link href="/" className="
            pl-4 pt-4 underline font-bold text-xl cursor-pointer
            top-0 left-0 sticky
        ">
        Back to home page
        </Link>
        <div className="
            max-w-128 mt-16 mb-8
            flex flex-col self-center gap-2
        ">
            <div className="text-2xl font-bold">
                Terms of Service
            </div>
            <div className="
                bg-gray-200 text-justify
                p-4 rounded-lg shadow-md border-2
            ">
                <p className="font-bold text-lg">
                    Privacy Notice (Alpha Test)
                </p>
                <p className="mt-2">
                    This notice explains how we handle your personal data during the alpha test of our accessibility scanner.
                </p>
                <ol className="list-decimal pl-4">
                    <li className="mt-4">
                        <p className="mb-2 mt-4 font-bold">What we collect</p>
                        <ul className="list-disc pl-4 flex flex-col gap-2">
                            <li>
                                <p>Email address (used for account creation and communication).</p>
                            </li>
                            <li>
                                <p>Website URLs you scan (used for testing functionality).</p>
                            </li>
                            <li>
                                <p>Accessibility report PDF files you generate (used to provide the files to you online and allow you to download them).</p>
                            </li>
                            <li>
                                <p>Your voluntary feedback comments (used to assess users’ opinions about the website and improve it).</p>
                            </li>
                        </ul>
                    </li>
                    <li className="mt-4">
                        <p className="mb-2 mt-4 font-bold">Why we collect it</p>
                        <ul className="list-disc pl-4 flex flex-col gap-2">
                            <li>
                                <p>To grant you access to the platform.</p>
                            </li>
                            <li>
                                <p>To communicate updates, gather feedback, and improve the tool.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="mt-4">
                        <p className="mb-2 mt-4 font-bold">How we Store It</p>
                        <ul className="list-disc pl-4 flex flex-col gap-2">
                            <li>
                                <p>Data is stored securely via cloud.digitalocean.com with restricted access.</p>
                            </li>
                            <li>
                                <p>We do not sell or share your data with third parties.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="mt-4">
                        <p className="mb-2 mt-4 font-bold">Your Rights</p>
                        <ul className="list-disc pl-4 flex flex-col gap-2">
                            <li>
                                <p>You can request to access, modify, or delete your data at any time by contacting us at accessibilitysupp@gmail.com.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="mt-4">
                        <p className="mb-2 mt-4 font-bold">Data Retention</p>
                        <ul className="list-disc pl-4 flex flex-col gap-2">
                            <li>
                                <p>All data collected during this alpha phase will be retained only as long as necessary for testing, or until you request deletion.</p>
                            </li>
                        </ul>
                    </li>
                    <li className="mt-4">
                        <p className="mb-2 mt-4 font-bold">Cookies</p>
                        <ul className="list-disc pl-4 flex flex-col gap-2">
                            <li>
                                <p>We may use minimal essential cookies or local storage for authentication and session management.</p>
                            </li>
                        </ul>
                    </li>
                </ol>
                <p className="font-bold mt-4">By continuing to use this service, you consent to the practices described above.</p>
            </div>
        </div>
    </main>
  );
}
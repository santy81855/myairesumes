import { Inter, Montserrat } from "next/font/google";
import Navbar from "./(components)/(auth-nav)/Nav";

export const metadata = {
    title: "Sign In",
    description: "Sign in to your account",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}

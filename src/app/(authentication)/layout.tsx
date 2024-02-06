import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import { ToastContainer } from "react-toastify";
import "../globals.css";

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
                <ToastContainer />
                <Navbar
                    style={{ backgroundColor: "white", color: "black" }}
                    isAuth={true}
                />
                {children}
            </body>
        </html>
    );
}

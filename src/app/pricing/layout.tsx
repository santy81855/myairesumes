import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
    title: "My Resume Hero - Pricing",
    description: "Choose the best plan for you!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
                <Navbar style={{ backgroundColor: "white", color: "black" }} />
                {children}
</>
    );
}

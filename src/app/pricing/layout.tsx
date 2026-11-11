import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
    title: "Plans & Pricing · My Resume Hero",
    description: "Compare Free, Pro, and six-month plans for AI-assisted resumes, cover letters, and organized job applications.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return <><Navbar />{children}</>;
}

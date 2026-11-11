import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Resume Hero - Dashboard",
    description: "Your profile, applications, resumes, and cover letters in one workspace.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

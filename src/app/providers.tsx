"use client";
import { createContext, useContext, useState } from "react";

type AppContextType = {
    resumeInformation: any;
    setResumeInformation: React.Dispatch<any>;
    resumeId: string;
    setResumeId: React.Dispatch<string>;
};

const AppContext = createContext({} as AppContextType);

export function ResumeContext({ children }: { children: React.ReactNode }) {
    const [resumeInformation, setResumeInformation] = useState<any>(null);
    const [resumeId, setResumeId] = useState<string>("");
    return (
        <AppContext.Provider
            value={{
                resumeInformation,
                setResumeInformation,
                resumeId,
                setResumeId,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

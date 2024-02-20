"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Document = {
    id: string;
    currentPage: number;
    information: any;
};

type AppContextType = {
    // add a type for resume and make it an array of objects
    documentArray: Document[];
    setDocumentArray: React.Dispatch<Document[]>;
    isReordering: boolean;
    setIsReordering: React.Dispatch<boolean>;
};

const AppContext = createContext({} as AppContextType);

export const ResumeContext = ({ children }: { children: React.ReactNode }) => {
    const [documentArray, setDocumentArray] = useState<Document[]>([]);

    useEffect(() => {
        const isStored = localStorage.getItem("documentArray");
        let initialArray: Document[] = [];
        if (!isStored) {
            localStorage.setItem("documentArray", JSON.stringify([]));
        } else {
            initialArray = JSON.parse(
                localStorage.getItem("documentArray") as string
            );
        }
        setDocumentArray(initialArray);
    }, []);

    useEffect(() => {
        // if the document array changes, update the local storage
        localStorage.setItem("documentArray", JSON.stringify(documentArray));
    }, [documentArray]);

    const [isReordering, setIsReordering] = useState<boolean>(false);
    return (
        <AppContext.Provider
            value={{
                isReordering,
                setIsReordering,
                documentArray,
                setDocumentArray,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
}

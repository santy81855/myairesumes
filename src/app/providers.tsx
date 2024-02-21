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
    const [documentArray, setDocumentArray] = useState<Document[] | []>(
        getLocalStorage("documentArray", [])
    );
    const [isReordering, setIsReordering] = useState<boolean>(false);

    useEffect(() => {
        setLocalStorage("documentArray", documentArray);
    }, [documentArray]);

    function setLocalStorage(key: string, value: any) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            // catch possible errors:
            // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        }
    }

    function getLocalStorage(key: string, initialValue: []) {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (e) {
            // if error, return initial value
            return initialValue;
        }
    }

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

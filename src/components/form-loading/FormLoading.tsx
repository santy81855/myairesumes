"use client";
import LoadingScreen from "../loading-screen/LoadingScreen";
import { useFormStatus } from "react-dom";

const FormLoading = () => {
    const { pending } = useFormStatus();
    return pending && <LoadingScreen />;
};

export default FormLoading;

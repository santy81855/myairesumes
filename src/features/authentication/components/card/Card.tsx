import { SignUpForm, SignInForm } from "@/features/authentication";

const Card = ({ authType }: { authType: string }) => (
    authType === "sign-up" ? <SignUpForm /> : <SignInForm />
);

export default Card;

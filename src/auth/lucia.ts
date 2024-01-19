// auth/lucia.ts
import { KeySchema, LuciaErrorConstructor, lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";

// expect error (see next section)
export const auth = lucia({
    env: "DEV", // "PROD" if deployed to HTTPS
    middleware: nextjs_future(), // NOT nextjs()
    sessionCookie: {
        expires: false,
    },
    adapter: {
        user: function (
            E: LuciaErrorConstructor
        ): Readonly<
            {
                getSessionAndUser?:
                    | ((
                          sessionId: string
                      ) => Promise<[any, any] | [null, null]>)
                    | undefined;
            } & Readonly<{
                getSession: (sessionId: string) => Promise<any>;
                getSessionsByUserId: (userId: string) => Promise<any[]>;
                setSession: (session: any) => Promise<void>;
                updateSession: (
                    sessionId: string,
                    partialSession: Partial<any>
                ) => Promise<void>;
                deleteSession: (sessionId: string) => Promise<void>;
                deleteSessionsByUserId: (userId: string) => Promise<void>;
            }> &
                Readonly<{
                    getUser: (userId: string) => Promise<any>;
                    setUser: (
                        user: any,
                        key: KeySchema | null
                    ) => Promise<void>;
                    updateUser: (
                        userId: string,
                        partialUser: Partial<any>
                    ) => Promise<void>;
                    deleteUser: (userId: string) => Promise<void>;
                    getKey: (keyId: string) => Promise<KeySchema | null>;
                    getKeysByUserId: (userId: string) => Promise<KeySchema[]>;
                    setKey: (key: KeySchema) => Promise<void>;
                    updateKey: (
                        keyId: string,
                        partialKey: Partial<KeySchema>
                    ) => Promise<void>;
                    deleteKey: (keyId: string) => Promise<void>;
                    deleteKeysByUserId: (userId: string) => Promise<void>;
                }>
        > {
            throw new Error("Function not implemented.");
        },
        session: function (
            E: LuciaErrorConstructor
        ): Readonly<{
            getSession: (sessionId: string) => Promise<any>;
            getSessionsByUserId: (userId: string) => Promise<any[]>;
            setSession: (session: any) => Promise<void>;
            updateSession: (
                sessionId: string,
                partialSession: Partial<any>
            ) => Promise<void>;
            deleteSession: (sessionId: string) => Promise<void>;
            deleteSessionsByUserId: (userId: string) => Promise<void>;
        }> {
            throw new Error("Function not implemented.");
        },
    },
});

export type Auth = typeof auth;

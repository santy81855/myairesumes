/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./src/auth/lucia").Auth;
    type DatabaseUserAttributes = {
        first_name: string;
        last_name: string;
        email: string;
    };
    type DatabaseSessionAttributes = {};
}

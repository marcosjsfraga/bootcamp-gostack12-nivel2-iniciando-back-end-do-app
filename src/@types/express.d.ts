// This file overwrites Express adding user propertie
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}

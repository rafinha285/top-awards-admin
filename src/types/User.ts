export interface User {
    id: number| null;
    name: string;
    email: string;
    type: UserType;
}

export enum UserType {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
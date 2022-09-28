export interface iUserAttributes {
    id?: string;
    name: string;
    hobby?: number;
    birthday: Date;
    document: string;
    status?: boolean;
}

export class User implements iUserAttributes {
    id: string;
    name: string;
    hobby?: number;
    birthday: Date;
    document: string;
    status?: boolean;
}
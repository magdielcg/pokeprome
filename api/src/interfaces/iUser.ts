export interface iUserAttributes {
    id?: string;
    name: string;
    hobby?: number;
    birthday: Date;
    document: string;
    status?: boolean;
}

export interface iUserInstance {
    id: string;
    name: string;
    hobby: number;
    birthday: Date;
    document: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    exp?: number;
}

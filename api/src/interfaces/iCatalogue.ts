export interface iCatalogueAttributes {
    id?: number;
    description: string;
    status?: boolean;
}

export interface iCatalogueInstance {
    id: number;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

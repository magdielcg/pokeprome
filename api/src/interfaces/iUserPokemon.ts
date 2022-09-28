export interface iUserPokemonAttributes {
    id?:string;
    idUser: string;
    idPokemon: number;
    status: boolean;
}

export interface iUserPokemonInstance {
    id: string;
    idUser: string;
    idPokemon: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
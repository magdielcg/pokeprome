import dotenv from 'dotenv';
dotenv.config();

export const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "PokeProme API",
            version: "1.0.0",
            description: ""
        },
        servers: [
            {
                url: "http://localhost:3001/pokeprome/api/v1"
            }
        ]
    },
    apis: ["./src/routes/*.ts"] 
}

import { body, param } from 'express-validator';

class UserValidatorPokemon {
    checkAssoc() {
        return [
            param('userId')
            .notEmpty()
            .withMessage('The userId is mandatory')
            .isUUID()
            .withMessage('The userId must be a UUID'),
            body()
            .notEmpty()
            .withMessage('The body request is mandatory')
        ]
    }

    checkGet() {
        return [
            param('userId')
            .notEmpty()
            .withMessage('The userId is require')
            .isUUID()
            .withMessage('The userId must be a UUID'),
            param('id')
            .notEmpty()
            .withMessage('The pokemonId is require')
            .isUUID()
            .withMessage('The pokemonId must be a UUID')
        ]
    }

    checkDelete() {
        return [
            param('userId')
            .notEmpty()
            .withMessage('The userId is require')
            .isUUID()
            .withMessage('The userId must be a UUID'),
            param('id')
            .notEmpty()
            .withMessage('The pokemonId is require')
            .isUUID()
            .withMessage('The pokemonId must be a UUID')
        ]
    }
}

export default new UserValidatorPokemon();


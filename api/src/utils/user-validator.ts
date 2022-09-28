import { body, param } from 'express-validator';

class UserValidator {
    checkCreate() {
        return [
            body('name')
            .notEmpty()
            .withMessage('The Name is mandatory'),
            body('birthday')
            .notEmpty()
            .withMessage('The birthday is mandatory'),
            body('document')
            .notEmpty()
            .withMessage('The document is mandatory')
        ]
    }

    checkGet() {
        return [
            param('id')
            .notEmpty()
            .withMessage('The userId is require')
            .isUUID()
            .withMessage('The userId must be a UUID')
        ]
    }

    checkUpdate() {
        return [
            param('id')
            .notEmpty()
            .withMessage('The userId is require')
            .isUUID()
            .withMessage('The userId must be a UUID'),
            body('name')
            .notEmpty()
            .withMessage('The Name is mandatory'),
            body('birthday')
            .notEmpty()
            .withMessage('The birthday is mandatory'),
            body('document')
            .notEmpty()
            .withMessage('The document is mandatory')
        ]
    }

    checkDelete() {
        return [
            param('id')
            .notEmpty()
            .withMessage('The userId is require')
            .isUUID()
            .withMessage('The userId must be a UUID')
        ]
    }

    checkLogin() {
        return [
            body('birthday')
            .notEmpty()
            .withMessage('The birthday is mandatory'),
            body('document')
            .notEmpty()
            .withMessage('The document is mandatory')
        ]
    }
}

export default new UserValidator();


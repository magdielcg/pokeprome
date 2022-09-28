import { Router } from 'express';
import MiddlewareValidator from '../utils/validators';
import User from '../controllers/user/user.controller';
import UserValidator from '../utils/user-validator';

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Login:
 *              type: object
 *              properties:
 *                  birthday:
 *                      type: string
 *                      description: Describe the birthday of the User
 *                      format: date
 *                  document:
 *                      type: string
 *                      description: Describe the document of the User
 *              required:
 *                  - birthday
 *                  - document
 *          Error:
 *              type: object
 *              properties:
 *                  status:
 *                      type: number
 *                  level:
 *                      type: string
 *                      description: The level could be ERROR o INFO
 *                  description:
 *                      type: string
 *                  error:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              value:
 *                                  type: string
 *                              msg:
 *                                  type: string
 *                              param:
 *                                  type: string
 *                              location:
 *                                  type: string
 */


/**
 * @swagger
 * /login:
 *  post:
 *      summary: Service to login
 *      tags: [Login]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          '200':
 *              description: Login success
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                            records:
 *                               type: array
 *                               items:
 *                                  $ref: '#/components/schemas/User'
 *          '500':
 *              description: Internal Error Server
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error' 
 *          '400':
 *              description: Error within the payload
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'
 *          '401':
 *              description: Unauthorized to do this action
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error' 
 *          '409':
 *              description: The User already exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'  
 *                                  
 */
router.post(
    '/',
    UserValidator.checkLogin(), 
    MiddlewareValidator.handleValidationError,
    User.login
)

export default router;

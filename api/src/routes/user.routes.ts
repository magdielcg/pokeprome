import { Router } from 'express';
import userPokemon from './userPokemon.routes';
import MiddlewareValidator from '../utils/validators';
import User from '../controllers/user/user.controller';
import UserValidator from '../utils/user-validator';

const router = Router();

router.use(MiddlewareValidator.handleValidationToken);

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Represents the ID of the User
 *                      format: uuid
 *                  name:
 *                      type: string
 *                      description: Describe the name of the User
 *                  hobby:
 *                      type: string
 *                      description: Describe the hobby of the User
 *                  birthday:
 *                      type: string
 *                      description: Describe the birthday of the User
 *                      format: date
 *                  document:
 *                      type: string
 *                      description: Describe the document of the User
 *                  status:
 *                      type: boolean
 *                      description: Describe the status of the User
 *              required:
 *                  - name
 *                  - birthday
 *                  - document
 *          UserIn:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Describe the name of the User
 *                  hobby:
 *                      type: string
 *                      description: Describe the hobby of the User
 *                  birthday:
 *                      type: string
 *                      description: Describe the birthday of the User
 *                      format: date
 *                  document:
 *                      type: string
 *                      description: Describe the document of the User
 *              required:
 *                  - name
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
 * /user:
 *  post:
 *      summary: Service to create a new User
 *      tags: [User]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserIn'
 *      responses:
 *          '201':
 *              description: User Created
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
    UserValidator.checkCreate(), 
    MiddlewareValidator.handleValidationError,
    User.create
)

/**
* @swagger
* /user/{userId}:
*  get:
*      summary: Service that provides a User available
*      tags: [User]
*      responses:
*          '200':
*              description: List of Users
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              records:
*                                  type: array
*                                  items:
*                                      $ref: '#/components/schemas/User'
*          '204':
*              description: Request success but no data
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Error'                                  
*/
router.get(
    '/:id',
    UserValidator.checkGet(), 
    MiddlewareValidator.handleValidationError,
    User.get
)

/**
* @swagger
* /user:
*  get:
*      summary: Service that provides the list of Users available
*      tags: [User]
*      responses:
*          '200':
*              description: List of Users
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              records:
*                                  type: array
*                                  items:
*                                      $ref: '#/components/schemas/User'
*          '204':
*              description: Request success but no data
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Error'                                  
*/
router.get(
    '/',
    User.getAll
)

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *      summary: Service to update a User
 *      tags: [User]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          '200':
 *              description: User updated
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
 *                                  
 */
router.put(
    '/:id',
    UserValidator.checkUpdate(), 
    MiddlewareValidator.handleValidationError,
    User.update
)

/**
 * @swagger
 * /user/{userId}:
 *  delete:
 *      summary: Service to delete a User
 *      tags: [User]
 *      responses:
 *          '200':
 *              description: User deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                            records:
 *                               type: array
 *                               items:
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
 *                                  
 */
router.delete(
    '/:id',
    UserValidator.checkDelete(), 
    MiddlewareValidator.handleValidationError,
    User.delete
)

router.use('/:userId/pokemon', userPokemon,);

export default router;

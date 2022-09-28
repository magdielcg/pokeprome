import { Router } from 'express';
import MiddlewareValidator from '../utils/validators';
import UserPokemon from '../controllers/userPokemon/userPokemon.controller';
import UserValidatorPokemon from '../utils/userPokemon-validator';

const router = Router({mergeParams:true});

/**
 * @swagger
 *  components:
 *      schemas:
 *          UserPokemon:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: Represents the ID of a User's pokemon association
 *                      format: uuid
 *                  idUser:
 *                      type: string
 *                      description: Represents the ID of the User
 *                      format: uuid
 *                  idPokemon:
 *                      type: number
 *                      description: Represents the ID of the Pokemon of the PokeApi
 *                  status:
 *                      type: boolean
 *                      description: Describe the status of the User
 *          UserPokemonIn:
 *              type: object
 *              properties:
 *                  idPokemon:
 *                      type: number
 *                      description: Represents the ID of the Pokemon of the PokeApi
 *              required:
 *                  - idPokemon
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
 * /user/{userId}/pokemon:
 *  post:
 *      summary: Service to associate one or more Pokemon to a User
 *      tags: [UserPokemon]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/UserPokemonIn'
 *      responses:
 *          '201':
 *              description: Association success
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                            records:
 *                               type: array
 *                               items:
 *                                  $ref: '#/components/schemas/UserPokemon'
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
 *              description: The association already exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Error'  
 *                                  
 */
router.post(
    '/',
    UserValidatorPokemon.checkAssoc(), 
    MiddlewareValidator.handleValidationError,
    UserPokemon.bulkCreate
)

/**
* @swagger
* /user/{userId}/pokemon:
*  get:
*      summary: Service that provides the list of Pokemons available of a User
*      tags: [UserPokemon]
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
*                                      $ref: '#/components/schemas/UserPokemon'
*          '204':
*              description: Request success but no data
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/Error'                                  
*/
router.get(
    '/',
    UserPokemon.getAll
)

/**
 * @swagger
 * /user/{userId}/pokemon/{pokemonId}:
 *  delete:
 *      summary: Service to delete a Pokemon of a User
 *      tags: [UserPokemon]
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
    UserValidatorPokemon.checkDelete(), 
    MiddlewareValidator.handleValidationError,
    UserPokemon.delete
)

export default router;

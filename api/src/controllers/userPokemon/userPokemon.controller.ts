import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from '../../../models';
import { iUserPokemonAttributes, iUserPokemonInstance} from '../../interfaces/iUserPokemon'
import { sendResponse, successResponse } from '../../utils/responses';


class UserPokemon {
    static create = async (req: Request, res: Response) => {
        try {
            const UserPokemonInstance: iUserPokemonInstance = await models.UserPokemon.create({...<iUserPokemonAttributes>req.body,...{id:uuidv4(), status:true}});
            return successResponse(res, 201, [UserPokemonInstance]);
        } catch(error: any) {
            return sendResponse(res, 500, '', error.errors[0]);
        }
    }

    static bulkCreate = async (req: Request, res: Response) => {
        try {
            let idUser = req.params.userId;
            
            const records: Array<iUserPokemonAttributes> = Array.isArray(req.body) ? req.body.map(record=>{ 
                return {...<iUserPokemonAttributes>record,...{id:uuidv4(), idUser, status:true}};
            }) : [];

            if(!records.length || (process.env.LIMIT_ASSOC && records.length > parseInt(`${process.env.LIMIT_ASSOC}`))){
                return sendResponse(res, 400);
            }

            await models.UserPokemon.update({
                status:false
            },{
                where:{
                    idUser,
                    status: true
                }
            });
            /*const processed: Array<iUserPokemonInstance> = await Promise.all(records.map(async record=>{
                const UserPokemonInstance: iUserPokemonInstance = await models.UserPokemon.create(record);
                return UserPokemonInstance;
            }));*/
            const processed: Array<iUserPokemonInstance> = await models.UserPokemon.bulkCreate(records);
            return successResponse(res, 201, [processed]);
        } catch(error: any) {
            return sendResponse(res, 500, '', error.errors[0]);
        }
    }

    static get = async (req: Request, res: Response) => {
        try{
            const UserPokemonInstance: iUserPokemonInstance = await models.UserPokemon.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(!UserPokemonInstance) {
                return sendResponse(res, 404, 'The UserPokemon does not exists');
            }

            return successResponse(res, 200, [UserPokemonInstance])

        } catch(error: any) {
            return sendResponse(res, 500, '', error.errors[0]);
        }
    }

    static getAll = async (req: Request, res: Response) => {
        let idUser = req.params.userId;
        try {
            const UserPokemonInstances: Array<iUserPokemonInstance> = await models.UserPokemon.findAll({
                where: {
                    status: true,
                    ...(idUser?{idUser}:{})
                }
            });

            return successResponse(res, 200, UserPokemonInstances);
        } catch(error: any) {
            return sendResponse(res, 500, '', error.errors[0]);
        }
    }

    static update = async (req: Request, res: Response) => {
        let idUser = req.params.userId;
        try{ 
            const UserPokemonInstance = await models.UserPokemon.findOne({
                where: {
                    id: req.params.id,
                    ...(idUser?{idUser}:{})
                }
            });

            if(!UserPokemonInstance) {
                return sendResponse(res, 404, 'The UserPokemon does not exists');
            }

            UserPokemonInstance.update({...<iUserPokemonAttributes>req.body});
            UserPokemonInstance.save();

            successResponse(res, 200, [UserPokemonInstance]);

        } catch(error: any) {
            return sendResponse(res, 500, '', error.errors[0]);
        }
    }

    static delete = async (req: Request, res: Response) => {
        let idUser = req.params.userId;
        try{ 
            const UserPokemonInstance = await models.UserPokemon.findOne({
                where: {
                    id: req.params.id,
                    ...(idUser?{idUser}:{})
                }
            });

            if(!UserPokemonInstance) {
                return sendResponse(res, 404, 'The UserPokemon trying to delete does not exists');
            }

            UserPokemonInstance.update({status: false});
            UserPokemonInstance.save();

            successResponse(res, 200, []);

        } catch(error: any) {
            return sendResponse(res, 500, '', error.errors[0]);
        }
    }
}

export default UserPokemon;
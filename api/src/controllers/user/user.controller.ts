import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { encode as jwtEncode } from 'jwt-simple';
import models from '../../../models';
import { iUserAttributes, iUserInstance} from '../../interfaces/iUser'
import { sendResponse, successResponse } from '../../utils/responses';


class User {
    static create = async (req: Request, res: Response) => {
        try {
            let UserAttributes: iUserAttributes = {...<iUserAttributes>req.body};
                UserAttributes.id = uuidv4();
                UserAttributes.status = true;
            const UserInstance: iUserInstance = await models.User.create(UserAttributes);
            return successResponse(res, 201, [UserInstance]);
        } catch(error: any) {
            return sendResponse(res, 500, '', error.message);
        }
    }

    static get = async (req: Request, res: Response) => {
        try{
            const UserInstance: iUserInstance = await models.User.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(!UserInstance) {
                return sendResponse(res, 404, 'The User does not exists');
            }

            return successResponse(res, 200, [UserInstance])

        } catch(error: any) {
            return sendResponse(res, 500, '', error.message);
        }
    }

    static getAll = async (req: Request, res: Response) => {
        try {
            const UserInstances: Array<iUserInstance> = await models.User.findAll({
                where: {
                    status: true
                }
            })

            return successResponse(res, 200, UserInstances);
        } catch(error: any) {
            return sendResponse(res, 500, '', error.message);
        }
    }

    static update = async (req: Request, res: Response) => {
        try{ 
            const UserInstance = await models.User.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(!UserInstance) {
                return sendResponse(res, 404, 'The User does not exists');
            }

            UserInstance.update({...<iUserAttributes>req.body});
            UserInstance.save();

            successResponse(res, 200, [UserInstance]);

        } catch(error: any) {
            return sendResponse(res, 500, '', error.message);
        }
    }

    static delete = async (req: Request, res: Response) => {
        try{ 
            const UserInstance = await models.User.findOne({
                where: {
                    id: req.params.id
                }
            })

            if(!UserInstance) {
                return sendResponse(res, 404, 'The User trying to delete does not exists');
            }

            UserInstance.update({status: false});
            UserInstance.save();

            sendResponse(res, 200, []);

        } catch(error: any) {
            return sendResponse(res, 500, '', error.message);
        }
    }

    static login = async (req: Request, res: Response) => {
        try{
            const UserAttributes: iUserAttributes = {...<iUserAttributes>req.body,...{name: ''}};

            const UserInstance: iUserInstance = await models.User.findOne({
                where: {
                    birthday: UserAttributes.birthday,
                    document: UserAttributes.document,
                    status: true
                }
            });

            if(!UserInstance) {
                return sendResponse(res, 401, 'The User not found');
            }

            let exp: Date = new Date;
                exp.setHours(exp.getHours() + 1);
            let payload = JSON.parse(JSON.stringify(UserInstance));
                payload.exp = exp.getTime() / 1000;
            const token = jwtEncode(payload,`${process.env.PVT_KEY}`);
            return successResponse(res, 200, [{token}]);

        } catch(error: any) {
            return sendResponse(res, 500, '', error.message);
        }
    }
}

export default User;
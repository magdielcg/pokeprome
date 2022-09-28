import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { decode as jwtDecode } from 'jwt-simple';
import { iUserInstance } from '../interfaces/iUser';
import {sendResponse} from './responses';

class MiddlewareValidator {
    handleValidationError(req: Request, res:Response, next: NextFunction) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return sendResponse(res, 400, 'Something wrong happend', errors.array());
        }

        next();
    }

    handleValidationToken(req: Request, res:Response, next: NextFunction) {
        const {mainPath} = req.app.locals, exclusions:Array<any> = [
            {
                path:`${mainPath}/user`,
                method: 'post'
            }
        ];
        if(!exclusions.filter(exclusion=>exclusion.path === req.baseUrl && exclusion.method === req.method.toLowerCase()).length){
            const auth : string = req.header('Authorization') || '';
            const token: string = auth.split(' ').at(1) || '';
            try {
                let user: iUserInstance = <iUserInstance>jwtDecode(token,`${process.env.PVT_KEY}`);
                req.app.locals.user = user;
            } catch (error: any) {
                return sendResponse(res, 401,'',[error.message]);
            }            
        }
        next();
    }
}

export default new MiddlewareValidator();

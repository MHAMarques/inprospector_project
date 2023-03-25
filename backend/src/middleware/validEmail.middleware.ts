import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppError from "../errors/AppError";

const validEmailMiddleware = async ( req:Request, res:Response, nxt:NextFunction) => {
    const checkEmail = req.body.email;
    const userRepo = AppDataSource.getRepository(User);
    if(checkEmail){
        const validQuery = await userRepo.findOneBy({email: checkEmail});

        if(String(validQuery) !== 'null'){
            throw new AppError(400, 'E-mail already registered to another user.');
        }
    }
    
    return nxt();    
}

export default validEmailMiddleware
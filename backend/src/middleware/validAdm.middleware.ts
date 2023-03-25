import { Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppError from "../errors/AppError";

const validAdmMiddleware = async ( req:Request, res:Response, nxt:NextFunction) => {
    const credential = req.user.isAdm;
    if(!credential){
        throw new AppError(403, 'Unauthorized credential.');
    }
    return nxt();
}

export default validAdmMiddleware;
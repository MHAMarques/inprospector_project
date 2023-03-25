import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { Request, Response, NextFunction} from "express";
import AppError from "../errors/AppError";

const checkUserMiddleware = async ( req:Request, res:Response, nxt:NextFunction) => {
    const checkId = req.user.id;
    const userRepo = AppDataSource.getRepository(User);
    const validQuery = await userRepo.findOneBy({id: checkId});
    
    if(req.user.isAdm || req.user.id === validQuery.id){return nxt();}
    throw new AppError(401, 'Unauthorized credential.');   
}

export default checkUserMiddleware
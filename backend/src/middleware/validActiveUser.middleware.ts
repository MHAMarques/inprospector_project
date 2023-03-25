import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { Request, Response, NextFunction} from "express";
import AppError from "../errors/AppError";

const validActiveUserMiddleware = async ( req:Request, res:Response, nxt:NextFunction) => {
    const checkId = req.params.id;
    const userRepo = AppDataSource.getRepository(User);
    
    const validQuery = await userRepo.findOneBy({id: checkId});
    if(!validQuery.isActive){
        throw new AppError(400, 'User can not be deleted.');
    }
    return nxt();    
}

export default validActiveUserMiddleware
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { Prospect } from "../entities/prospect.entity";
import { Request, Response, NextFunction} from "express";
import AppError from "../errors/AppError";

export const validUserMiddleware = async ( req:Request, res:Response, nxt:NextFunction) => {
    const checkId = req.params.id;
    const userRepo = AppDataSource.getRepository(User);
    const validQuery = await userRepo.findOneBy({id: checkId});
    
    if(req.user.isAdm || req.user.id === validQuery.id){return nxt();}
    throw new AppError(401, 'Unauthorized credential.');   
}

export const validOwnerMiddleware = async ( req:Request, res:Response, nxt:NextFunction) => {
    const checkProspect = req.params.id;
    const ProspectRepo = AppDataSource.getRepository(Prospect);

    // const validQuery = await ProspectRepo.findOneBy({id: checkProspect});
    const validQuery = await ProspectRepo
    .createQueryBuilder("prospects")
    .where("prospects.user.id = :user", { user: req.user.id })
    .andWhere("prospects.id = :id" , {id: checkProspect})
    .getOne();

    if(req.user.isAdm || validQuery){return nxt();}
    throw new AppError(401, 'Unauthorized credential.');   
}
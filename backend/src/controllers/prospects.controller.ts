import { Request, Response } from "express";
import { IProspectRequest, IProspectUpdate } from "../interfaces/prospects";
import newProspectService from "../services/prospects/newProspect.service";
import listProspectsService from "../services/prospects/listProspects.service";
import updateProspectService from "../services/prospects/updateProspect.service";
import deleteProspectService from "../services/prospects/deleteProspect.service";
import { newProspectSchema, updateProspectSchema } from "../schemas/prospect.schema";
import AppError from "../errors/AppError";

export const newProspectController = async(req: Request, res: Response) => {
    try {
        const valid = await newProspectSchema.validate(req.body,{
            stripUnknown: true,
            abortEarly: false
        })
        const prospectInfo: IProspectRequest = valid;
        const userId: string = req.user.id;
        const prospectData = await newProspectService(prospectInfo, userId);
        return res.status(201).json(prospectData);
    } catch (error) {
        console.log("THIS IS THE ERROR MAN! ",error)
        throw new AppError(400, error.errors);
    }
}

export const listProspectsController = async(req: Request, res: Response) => {
    const userId: string = req.user.id;
    const userData = await listProspectsService(userId);
    return res.status(200).json(userData);
}

export const updateProspectController = async (req:Request, res: Response) => {
    try {
        const valid = await updateProspectSchema.validate(req.body,{
            stripUnknown: true,
            abortEarly: false
        })
        const prospectId: string = req.params.id;
        const prospectInfo: IProspectUpdate = valid;
        if(JSON.stringify(prospectInfo) === '{}'){
            return res.status(401).json({message: 'Unauthorized update.'});
        }
        const userData = await updateProspectService(prospectId, prospectInfo);
        return res.status(200).json(userData);
    } catch (error) {
        throw new AppError(400, error.errors);
    }
}

export const deleteProspectController = async(req: Request, res: Response) => {
    const prospectId: string = req.params.id;
    const prospectData = await deleteProspectService(prospectId);
    return res.status(204).json(prospectData);
}
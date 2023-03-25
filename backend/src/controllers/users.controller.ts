import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import newUserService from "../services/users/newUser.service";
import listUsersService from "../services/users/listUsers.service";
import getUsersService from "../services/users/getUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import { newUserSchema, updateUserSchema } from "../schemas/user.schemas";
import AppError from "../errors/AppError";

export const newUserController = async(req: Request, res: Response) => {
    try {
        const valid = await newUserSchema.validate(req.body,{
            stripUnknown: true,
            abortEarly: false
        })
        const userInfo: IUserRequest = valid;
        const userData = await newUserService(userInfo);
        return res.status(201).json(userData);
    } catch (error) {
        throw new AppError(400, error.errors);
    }
}

export const listUsersController = async(req: Request, res: Response) => {
    const userData = await listUsersService();
    return res.status(200).json(userData);
}

export const getUsersController = async(req: Request, res: Response) => {
    const userId: string = req.user.id;
    const userData = await getUsersService(userId);
    return res.status(200).json(userData);
}

export const updateUserController =async (req:Request, res: Response) => {
    try {
        const valid = await updateUserSchema.validate(req.body,{
            stripUnknown: true,
            abortEarly: false
        })
        const userId: string = req.params.id;
        const userInfo: IUserUpdate = valid;
        if(JSON.stringify(userInfo) === '{}'){
            return res.status(401).json({message: 'Unauthorized update.'});
        }
        const userData = await updateUserService(userId, userInfo);
        return res.status(200).json(userData);
    } catch (error) {
        throw new AppError(400, error.errors);
    }
}

export const deleteUserController = async(req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userData = await deleteUserService(userId);
    return res.status(204).json(userData);
}
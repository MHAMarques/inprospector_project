import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserUpdate, IUser } from "../interfaces/users";

export const newUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().min(2).max(100).required(),
    last_name: yup.string().min(2).max(100).required(),
    phone: yup.string().min(7).max(15).required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean()
});

export const updateUserSchema: SchemaOf<IUserUpdate> = yup.object().shape({
    name: yup.string(),
    last_name: yup.string(),
    phone: yup.string()
});

export const userResponseSchema: SchemaOf<IUser> = yup.object().shape({
    prospects: yup.array(),
    updatedAt: yup.date(),
    createdAt: yup.date(),
    isActive: yup.boolean(),
    isAdm: yup.boolean(),
    email: yup.string().email(),
    phone: yup.string(),
    last_name: yup.string(),
    name: yup.string(),
    id: yup.string()
});

export const userListSchema: SchemaOf<IUser[]> = yup.array(
    yup.object().shape({
        prospects: yup.array(),
        updatedAt: yup.date(),
        createdAt: yup.date(),
        isActive: yup.boolean(),
        isAdm: yup.boolean(),
        email: yup.string().email(),
        phone: yup.string(),
        last_name: yup.string(),
        name: yup.string(),
        id: yup.string()
    })
);
import { IProspect } from "../prospects"

export interface IUserRequest {
    name: string
    last_name: string
    phone: string
    email: string
    password: string
    isAdm: boolean
}


export interface IUser {
    prospects: IProspect[]
    updatedAt: Date
    createdAt: Date
    isActive: boolean
    isAdm: boolean
    email: string
    phone: string
    last_name: string
    name: string
    id: string
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    last_name?: string
    phone?: string
    email?: string
    password?: string
}

export interface IUserToken {
    id: string,
    isAdm: boolean
}
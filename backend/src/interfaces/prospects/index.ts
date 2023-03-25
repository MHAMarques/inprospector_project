import { IUser } from "../users"

export interface IProspectRequest {
    name: string
    last_name: string
    phone: string
    email: string
    linkedin: string
    company: string
    job_title: string
    information: string
}

export interface IProspectResponse {
    name: string
    last_name: string
    phone: string
    email: string
    linkedin: string
    company: string
    job_title: string
    information: string
}

export interface IProspect {
    updatedAt: Date
    createdAt: Date
    information: string
    job_title: string
    company: string
    linkedin: string
    email: string
    phone: string
    last_name: string
    name: string
    id: string
}

export interface IProspectUpdate {
    name?: string
    last_name?: string
    phone?: string
    email?: string
    linkedin?: string
    company?: string
    job_title?: string
    information?: string
}

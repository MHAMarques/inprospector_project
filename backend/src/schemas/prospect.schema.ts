import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProspectRequest, IProspectUpdate, IProspect } from "../interfaces/prospects";

export const newProspectSchema: SchemaOf<IProspectRequest> = yup.object().shape({
    name: yup.string().min(2).max(100).required(),
    last_name: yup.string().min(2).max(100).required(),
    phone: yup.string().min(7).max(15).required(),
    email: yup.string().email().required(),
    linkedin: yup.string().max(250).required(),
    company: yup.string().max(250).required(),
    job_title: yup.string().max(250).required(),
    information: yup.string().max(960).required()
});

export const updateProspectSchema: SchemaOf<IProspectUpdate> = yup.object().shape({
    name: yup.string(),
    last_name: yup.string(),
    phone: yup.string(),
    email: yup.string().email(),
    linkedin: yup.string(),
    company: yup.string(),
    job_title: yup.string(),
    information: yup.string()
});

export const prospectResponseSchema: SchemaOf<IProspect> = yup.object().shape({
    updatedAt: yup.date(),
    createdAt: yup.date(),
    information: yup.string(),
    job_title: yup.string(),
    company: yup.string(),
    linkedin: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
    last_name: yup.string(),
    name: yup.string(),
    id: yup.string()
});

export const prospectListSchema: SchemaOf<IProspect[]> = yup.array(
    yup.object().shape({
        updatedAt: yup.date(),
        createdAt: yup.date(),
        information: yup.string(),
        job_title: yup.string(),
        company: yup.string(),
        linkedin: yup.string(),
        email: yup.string().email(),
        phone: yup.string(),
        last_name: yup.string(),
        name: yup.string(),
        id: yup.string()
    })
);

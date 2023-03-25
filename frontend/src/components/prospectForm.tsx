import styles from '@/styles/Home.module.css'
import { text } from 'stream/consumers'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAuth } from '@/pages/api/request';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface IProspect {
    id: string;
    name: string;
    last_name: string;
    email: string;
    linkedin: string;
    company: string;
    job_title: string;
    phone: string;
    information: string;
}

export function ProspectForm() {
    const yupSchema = yup.object().shape({
        email: yup.string().required("Preencha o campo com um email válido.").email("Email inválido"),
        name: yup.string().required("Preencha o campo com seu nome."),
        last_name: yup.string().required("Preencha o campo com os sobrenomes."),
        phone: yup.string().required("Preencha o campo de telefone."),
        linkedin: yup.string().required("Preencha o campo do linkedin."),
        company: yup.string().required("Preencha o campo da empresa."),
        job_title: yup.string().required("Preencha o campo do cargo."),
        information: yup.string().required("Preencha o campo das informações."),
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm<IProspect>({
        resolver: yupResolver(yupSchema),
    });
    const navigate = useRouter();
    const [regError, setregError] = useState<String>("none");
    async function onFormSubmit(formData:IProspect){
        const newProspect = await apiAuth
        .post('/prospects/', formData)
        .then((res) => res.data)
        .catch((err => {
            console.log("ERROS: ",err.response.data["message"])
            setregError(err.response.data["message"])
            return false
            
        }))
        if(newProspect){
            setTimeout(() => navigate.push('/hub'), 500);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div></div>
                <div></div>
                <h4>» Nome:</h4>
                <input type="text" {...register("name")} required />
                <h4>» Sobrenome:</h4>
                <input type="text" {...register("last_name")} required />
                <h4>» E-mail:</h4>
                <input type="email" {...register("email")} required />
                <h4>» Telefone:</h4>
                <input type="number" {...register("phone")} required />
                <h4>» Linkedin:</h4>
                <input type="text" {...register("linkedin")} required />
                <h4>» Empresa:</h4>
                <input type="text" {...register("company")} required />
                <h4>» Cargo:</h4>
                <input type="text" {...register("job_title")} required />
                <h4>» Informações:</h4>
                <textarea {...register("information")} />
                <br /><br />
                <button type="submit">Adicionar</button>
                <br /><br />
                {regError !== 'none' ? regError : ''}
            </form>
        </>
    )
}
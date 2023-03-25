import styles from '@/styles/Home.module.css'
import { text } from 'stream/consumers'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAuth } from '@/pages/api/request';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IHubInfo } from './hubInfo';

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

export function ProspectUpdate({profileInfo}:IHubInfo) {
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
    const prospects: IProspect[] = profileInfo.prospects;
    const oneProspect = navigate.query.one;
    const oneDelete = navigate.query.delete;
    const filteredProspect = prospects.filter((prospect) => prospect.id === oneProspect);
    const updateProspect = filteredProspect[0];
    
    async function onFormSubmit(formData:IProspect){
        const updateProspect = await apiAuth
        .patch('/prospects/'+oneProspect, formData)
        .then((res) => res.data)
        .catch((err => {
            console.log("ERROS: ",err.response.data["message"])
            setregError(err.response.data["message"])
            return false
            
        }))
        if(updateProspect){
            setTimeout(() => navigate.push('/list?one='+oneProspect), 500);
        }
    }
    async function deleteProspect(){
        const updateProspect = await apiAuth
        .delete('/prospects/'+oneProspect)
        .then((res) => res.data)
        .catch((err => {
            console.log("ERROS: ",err.response.data["message"])
            setregError(err.response.data["message"])
            return false
        }));
        
        navigate.push('/list');
    }

    if(oneDelete == 'it'){
        deleteProspect();
        return<></>
    }
    
    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div></div>
                <div></div>
                <h4>» Nome:</h4>
                <input type="text" {...register("name")} defaultValue={updateProspect.name} required />
                <h4>» Sobrenome:</h4>
                <input type="text" {...register("last_name")} defaultValue={updateProspect.last_name} required />
                <h4>» E-mail:</h4>
                <input type="email" {...register("email")} defaultValue={updateProspect.email} required />
                <h4>» Telefone:</h4>
                <input type="number" {...register("phone")} defaultValue={updateProspect.phone} required />
                <h4>» Linkedin:</h4>
                <input type="text" {...register("linkedin")} defaultValue={updateProspect.linkedin} required />
                <h4>» Empresa:</h4>
                <input type="text" {...register("company")} defaultValue={updateProspect.company} required />
                <h4>» Cargo:</h4>
                <input type="text" {...register("job_title")} defaultValue={updateProspect.job_title} required />
                <h4>» Informações:</h4>
                <textarea {...register("information")} defaultValue={updateProspect.information}/>
                <br /><br />
                <button type="submit">Atualizar</button>
                <br /><br />
                <h4><center><a href={"/update?one="+updateProspect.id+"&delete=it"} >Deletar Contato</a></center></h4>
                {regError !== 'none' ? regError : ''}
            </form>
        </>
    )
}
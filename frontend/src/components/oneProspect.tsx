import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { IProfileUser } from "./hubPage"
import { IProspect } from './prospectForm'
import { IHubInfo } from './hubInfo'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAuth } from '@/pages/api/request';
import { useState } from 'react';

export interface IInformation {
    information: string;
}

export function OneProspect ({profileInfo}:IHubInfo){
    const [saving, setSaving] = useState<string>('Salvar');
    const howMany: number = profileInfo.prospects.length;
    const prospects: IProspect[] = profileInfo.prospects;
    const navigate = useRouter();
    const oneProspect = navigate.query.one;
    const filteredProspects = prospects.filter((prospect) => prospect.id === oneProspect);

    const yupSchema = yup.object().shape({
        information: yup.string().required("Preencha o campo informações."),
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm<IInformation>({
        resolver: yupResolver(yupSchema),
    });
    const [logError, setlogError] = useState<Boolean>(false);
    async function onFormSubmit(formData:IInformation){
        const saveData = await apiAuth
        .patch('/prospects/'+oneProspect, formData)
        .then((res) => res.data)
        .catch((err => {
            console.log("ERRO: ",err.message)
            return false
        }))
        if(saveData){
            setSaving('Informação Salva');
            setTimeout(() => setSaving('Salvar'), 2500);
        }
    }

    return (
        <>
        {filteredProspects.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((prospect) => (
        <article key={prospect.id}>
            <div><h1>{prospect.name} {prospect.last_name}</h1>
            <br />
            <h2>{prospect.company}</h2>
            <h4>{prospect.job_title}</h4>
            <br />
            
            <h4><Link href={"mailto:"+prospect.email} target="_blank">{prospect.email}</Link></h4>
            <h4><Link href={"http://wa.me/"+prospect.phone} target="_blank">{prospect.phone}</Link></h4>
            <h4><Link href={prospect.linkedin} target="_blank">Perfil Linkedin</Link></h4>
            <h4><Link href={"/update?one="+prospect.id} target="_blank">Atualizar dados</Link></h4>
            </div>
            <div><form onSubmit={handleSubmit(onFormSubmit)}>
                <textarea {...register("information")} defaultValue={prospect.information}></textarea>
                <button type="submit">{saving}</button>
            </form></div>

        </article>
        ))}

        </>
    )
}
import styles from '@/styles/Home.module.css'
import { text } from 'stream/consumers'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAuth } from '@/pages/api/request';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface IUserLogin {
    email: string;
    password: string;
}

export function LoginForm() {
    const yupSchema = yup.object().shape({
        email: yup.string().required("Preencha o campo com um email válido.").email("Email inválido"),
        password: yup.string().required("Preencha o campo com uma senha."),
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm<IUserLogin>({
        resolver: yupResolver(yupSchema),
    });
    const navigate = useRouter();
    const [logError, setlogError] = useState<Boolean>(false);
    async function onFormSubmit(formData:IUserLogin){
        const logUser = await apiAuth
        .post('/login/', formData)
        .then((res) => res.data)
        .catch((err => {
            console.log("ERRO: ",err.message)
            return false
        }))
        if(logUser){
            localStorage.setItem("InProspector:Token", logUser.token);
            setTimeout(() => navigate.push('/hub'), 500);
            setlogError(false);
        } 
        else{
            console.log("Problemas para logar")
            setlogError(true);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <h4>» E-mail de acesso:</h4>
                <input type="email" {...register("email")} required />
                <h4>» Senha de acesso:</h4>
                <input type="password" {...register("password")} required />
                <br /><br />                
                <button type="submit">Acessar</button>
                <br /><br />
                {logError ? 'Dados de acesso inválidos' : ''}
            </form>
        </>
    )
}
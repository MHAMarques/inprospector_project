import styles from '@/styles/Home.module.css'
import { text } from 'stream/consumers'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAuth } from '@/pages/api/request';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface IRegisterUser {
    email: string;
    password: string;
    checkpass: string;
    name: string;
    last_name: string;
    phone: string;
}

export function RegisterForm() {
    const yupSchema = yup.object().shape({
        email: yup.string().required("Preencha o campo com um email válido.").email("Email inválido"),
        password: yup.string().required("Preencha o campo com uma senha.").min(3, "Senha com um mínimo de 3 caracteres"),
        checkpass: yup.string().oneOf([yup.ref('password')], "Senha diferente."),
        name: yup.string().required("Preencha o campo com seu nome."),
        last_name: yup.string().required("Preencha o campo com os sobrenomes."),
        phone: yup.string().required("Preencha o campo de telefone.")
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterUser>({
        resolver: yupResolver(yupSchema),
    });
    const navigate = useRouter();
    const [regError, setregError] = useState<String>("none");
    async function onFormSubmit(formData:IRegisterUser){
        const newUser = await apiAuth
        .post('/users/', formData)
        .then((res) => res.data)
        .catch((err => {
            console.log("ERROS: ",err.response.data["message"])
            setregError(err.response.data["message"])
            return false
            
        }))
        if(newUser){
            setTimeout(() => navigate.push('/signin?reg=done'), 500);
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
                <h4>» Nome:</h4>
                <input type="text" {...register("name")} required />
                <h4>» Sobrenome:</h4>
                <input type="text" {...register("last_name")} required />
                <h4>» Telefone:</h4>
                <input type="number" {...register("phone")} required />
                <br /><br />
                <button type="submit">Cadastrar</button>
                <br /><br />
                {regError !== 'none' ? regError : ''}
            </form>
        </>
    )
}
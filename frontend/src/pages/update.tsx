import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { apiAuth } from '@/pages/api/request';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IProfileUser } from '@/components/hubPage';
import { ProspectList } from '@/components/prospectList';
import { OneProspect } from '@/components/oneProspect';
import { UserUpdate } from '@/components/userUpdate';
import { ProspectUpdate } from '@/components/prospectUpdate';


export default function Home() {
    const [profile, setProfile] = useState<IProfileUser>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [userToken, setUserToken] = useState<Boolean>(false);
    const navigate = useRouter();
    const query = navigate.query.log;
    const oneProspect = navigate.query.one;
    
    useEffect (() => {
        async function getProfile(){
            const token = localStorage.getItem("InProspector:Token");
            if(token){
                apiAuth.defaults.headers.authorization = `Bearer ${token}`;
                const dataProfile = await apiAuth
                .get('users/profile')
                .then((res) => res.data)
                .catch((err => {
                    console.log(err)
                    localStorage.clear();
                    navigate.push(('/'));
                    return null
                }))
                setProfile(dataProfile);
                setLoading(false);
            }
        }

        getProfile();
    }, [navigate]);

    if (typeof window !== "undefined" && userToken == false) {
        const Token = localStorage.getItem("InProspector:Token");
        if(Token){setUserToken(true);}
        else{
            navigate.push(('/'))
        }
    }
    if(query == 'off'){
        localStorage.clear();
        navigate.push(('/'));
    }

    return (
    <>
        <Head>
        <title>In Prospector - Listar prospects</title>
        <meta name="description" content="Registre uma conta e acompanhe seus contatos do LinkeIn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/inIcon.png" />
        </Head>
        <main className={styles.main}>
        <div className={styles.description}>
            <p>
                {profile ? profile.email + ' - ' + profile.name + ' ' + profile.last_name : 'Acesso Prospector'}
            </p>
            <div>
            <a
                href="/list"
                rel="noopener noreferrer"
            >
                <Image
                src="/logoProspector.png"
                alt="Prospector Logo"
                width={256}
                height={100}
                priority
                />
            </a>
            </div>
        </div>

        <div className={styles.center}>
            <div className={styles.register}>
            {profile ? oneProspect ? <ProspectUpdate profileInfo = {profile}/> : <UserUpdate profileInfo = {profile}/> : ''}
            </div>
        </div>

        <div className={styles.grid}>
        <a
            href="/howto"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Como usar <span>»</span>
            </h2>
            <p>
              Aprenda como aproveitar ao máximo de forma rápida e fácil!
            </p>
          </a>

          <a
            href="/add"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Novo Prospect <span>»</span>
            </h2>
            <p>
              Clique para adicionar um novo prospect à sua rede de contatos.
            </p>
          </a>

          <a
            href="/hub/?log=off"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Fechar App <span>»</span>
            </h2>
            <p>
              Clique para sair. Será necessário usar seus dados para acessar novamente.
            </p>
          </a>
        </div>
        </main>
    </>
    )
}

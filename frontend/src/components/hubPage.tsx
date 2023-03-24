import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { apiAuth } from '@/pages/api/request';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HubInfo } from './hubInfo';

export interface IProfileUser {
    id: string;
    email: string;
    name: string;
    last_name: string;
    phone: string;
    prospects: [];
}

export function HubPage(){
    const [profile, setProfile] = useState<IProfileUser>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [userToken, setUserToken] = useState<Boolean>(false);
    const navigate = useRouter();
    const query = navigate.query.log;
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
    
    if(loading) return <h3>Loading</h3>;
    return (
        <>
        <main className={styles.main}>
        <div className={styles.description}>
          <p>
            {profile ? profile.email + ' - ' + profile.name + ' ' + profile.last_name : 'Acesso Prospector'}
          </p>
          <div>
            <a
              href="/"
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
          
        {profile ? <HubInfo profileInfo = {profile}/> : ''}
          <a
              href="/list"
              rel="noopener noreferrer"
          ><div className={styles.thirteen}>
              Listar prospects.
          </div></a>
          <a
              href="/add"
              rel="noopener noreferrer"
          ><div className={styles.thirteen}>
                Adicionar prospect
          </div></a>
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
            href="/update"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Atualizar <span>»</span>
            </h2>
            <p>
              Clique para atualizar as suas informações de acesso.
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
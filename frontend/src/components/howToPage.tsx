import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { apiAuth } from '@/pages/api/request';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HubInfo } from './hubInfo';
import { HelpMe } from './helpMe';

export interface IProfileUser {
    id: string;
    email: string;
    name: string;
    last_name: string;
    phone: string;
    prospects: [];
}

export function HowToPage(){
    const [profile, setProfile] = useState<IProfileUser>();
    const [userToken, setUserToken] = useState<Boolean>(false);
    const navigate = useRouter();
    const help = parseInt(navigate.query.help);
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
                    return null
                }))
                setProfile(dataProfile);
            }
        }

        getProfile();
    }, [navigate]);
    
    if (typeof window !== "undefined" && userToken == false) {
        const Token = localStorage.getItem("InProspector:Token");
        if(Token){setUserToken(true);}
    }
    
    return (
        <>
        <main className={styles.main}>
        <div className={styles.description}>
          <p>
            {profile ? profile.email + ' - ' + profile.name + ' ' + profile.last_name : 'Saiba como aproveitar o app'}
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
          
            <div className={styles.prospector}>
              <HelpMe />
            </div>
        </div>

        <div className={styles.grid}>
        <a
            href={help > 0 && help < 9 ? "/howto?help="+(help+1) : "/howto?help=1"}
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Próxima ajuda <span>»</span>
            </h2>
            <p>
              Continue a sabe como aproveitar melhor o aplicativo!
            </p>
          </a>

          <a
            href={help > 1 && help < 9 ? "/howto?help="+(help-1) : "/howto"}
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Ajuda anterior <span>»</span>
            </h2>
            <p>
              Se precisar entender melhor, volte uma página para conferir novamente.
            </p>
          </a>

          <a
            href="/hub"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Acessar<span>»</span>
            </h2>
            <p>
              Clique para acesar e aproveitar o melhor que o app pode fornecer.
            </p>
          </a>
        </div>
      </main>
        </>
    )
}
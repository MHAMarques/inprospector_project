import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';

export function MainPage(){
  const [urlAccess, seturlAccess] = useState<string>('/signin')
  
  // let urlAcess = '/signin';
  if (typeof window !== "undefined") {
      const Token = localStorage.getItem("InProspector:Token");
      if(Token){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => seturlAccess('/hub'), []);
      }
  }

    return (
        <>
        <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Se inscreva hoje e aproveite!
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
          <a
              href="/signup"
              rel="noopener noreferrer"
          ><div className={styles.thirteen}>
              Registrar uma conta.
          </div></a>
          <a
              href={urlAccess}
              rel="noopener noreferrer"
          ><div className={styles.thirteen}>
            
              Acessar uma conta.
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
            href="/signup"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Informações <span>»</span>
            </h2>
            <p>
              Mantenha registro de informações pertinentes sobre seus prospects.
            </p>
          </a>

          <a
            href="/signup"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              LinkedIn <span>»</span>
            </h2>
            <p>
              Registre e acompanhe as notificações de seus contatos pelo LinkeIn.
            </p>
          </a>
        </div>
      </main>
        </>
    )
}
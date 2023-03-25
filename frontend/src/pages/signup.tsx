import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { RegisterForm } from '@/components/registerForm'


export default function Home() {
  return (
    <>
      <Head>
        <title>In Prospector - Registrar uma conta</title>
        <meta name="description" content="Registre uma conta e acompanhe seus contatos do LinkeIn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/inIcon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Registre suas informações abaixo.
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
          <div className={styles.register}>
            <RegisterForm />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="/howto?help=1"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Suas informações <span>»</span>
            </h2>
            <p>
              Complete o formulário com suas informações para ter acesso.
            </p>
          </a>

          <a
            href="/signin"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              Acessar conta <span>»</span>
            </h2>
            <p>
              Caso já tenha feito um registro, clique para acessar.
            </p>
          </a>

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
        </div>
      </main>
    </>
  )
}

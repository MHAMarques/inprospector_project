import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { RegisterForm } from '@/components/registerForm'
import { LoginForm } from '@/components/loginForm'


export default function Home() {
    const navigate = useRouter();
    const query = navigate.query.reg;
    return (
    <>
        <Head>
        <title>In Prospector - Acessar uma conta</title>
        <meta name="description" content="Registre uma conta e acompanhe seus contatos do LinkeIn." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/inIcon.png" />
        </Head>
        <main className={styles.main}>
        <div className={styles.description}>
            <p>
                {query == 'done' ? 'Registro concluído!' : ''} Acesse com suas informações abaixo.
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
                <LoginForm />
            </div>
        </div>

        <div className={styles.grid}>
            <a
            href="/howto"
            className={styles.card}
            rel="noopener noreferrer"
            >
            <h2>
                Suas informações <span>»</span>
            </h2>
            <p>
                Complete o formulário com seu email e senha de acesso.
            </p>
            </a>

            <a
            href="/signup"
            className={styles.card}
            rel="noopener noreferrer"
            >
            <h2>
                Registrar conta <span>»</span>
            </h2>
            <p>
                Caso não tenha registrado uma conta, clique para registrar.
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

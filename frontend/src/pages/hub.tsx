import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { HubPage } from '@/components/hubPage';


export default function Home() {
    
    return (
    <>
        <Head>
        <title>In Prospector - Amplie Conexões</title>
        <meta name="description" content="Aplicativo para gerenciamento de rede de contatos do linked in." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/inIcon.png" />
        </Head>
        <HubPage />
    </>
  )
}

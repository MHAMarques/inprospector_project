import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { IProspect } from './prospectForm'
import { IHubInfo } from './hubInfo'

export function ProspectList ({profileInfo}:IHubInfo){
    const howMany: number = profileInfo.prospects.length;
    const prospects: IProspect[] = profileInfo.prospects;
    
    return (
        <>
        <ul>
        {prospects.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((prospect) => (
            <Link key={prospect.id}
            href={"/list?one="+prospect.id}
            className={styles.card}
            rel="noopener noreferrer"
            ><li>
            <h4>{prospect.name} {prospect.last_name}</h4>
            <small>{prospect.company}</small>
            <h6>{prospect.job_title}</h6>
            </li></Link>
        ))}
        </ul>

        </>
    )
}
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { IProfileUser } from "./hubPage"

export interface IHubInfo{
    profileInfo: IProfileUser
}

export function HubInfo ({profileInfo}:IHubInfo){
    const howMany = profileInfo.prospects.length;
    return <p className={styles.hubInfo}>Oi {profileInfo.name}, você possui {howMany} {howMany > 1 ? 'prospects cadastrados' : 'prospect cadastrado'}. </p>
}
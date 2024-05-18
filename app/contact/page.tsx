'use client'
import { FC } from 'react'
import styles from '@/app/contact/contact.module.sass'
import { useAppSelector } from '@/redux'

const Contact: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
        
        </div>
    )
}

export default Contact
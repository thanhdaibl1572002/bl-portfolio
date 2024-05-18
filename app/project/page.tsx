'use client'
import { FC } from 'react'
import styles from '@/app/project/project.module.sass'
import { useAppSelector } from '@/redux'

const Project: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
        
        </div>
    )
}

export default Project
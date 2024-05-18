'use client'
import { FC } from 'react'
import styles from '@/app/skill/skill.module.sass'
import { useAppSelector } from '@/redux'

const Skill: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
        
        </div>
    )
}

export default Skill
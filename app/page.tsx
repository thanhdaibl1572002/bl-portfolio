'use client'
import { FC } from 'react'
import styles from '@/app/page.module.sass'
import { useAppSelector } from '@/redux'

const Home: FC = () => {
  const { theme } = useAppSelector(state => state.theme)
  return (
    <div className={styles[`_container__${theme}`]}>
      
    </div>

  )
}

export default Home
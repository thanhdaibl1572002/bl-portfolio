'use client'
import { FC } from 'react'
import styles from '@/app/page.module.sass'
import { useAppSelector } from '@/redux'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

const Home: FC = () => {
  const { theme } = useAppSelector(state => state.theme)
  return (
    <div className={styles[`_root__${theme}`]}>
      <Header />
      <main className={styles[`_container__${theme}`]}>
        
      </main>
      <Footer />
    </div>

  )
}

export default Home
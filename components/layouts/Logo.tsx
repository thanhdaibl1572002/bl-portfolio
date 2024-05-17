import { FC } from 'react'
import styles from '@/components/layouts/logo.module.sass'
import { useAppSelector } from '@/redux'
import { GiEvilLove } from 'react-icons/gi'
import Link from 'next/link'

const Logo: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
      <h1 className={styles[`_container__${theme}`]}>
        <Link href={'/'}>
            <strong>BL</strong> Folio
        </Link>
      </h1>
    )
}

export default Logo
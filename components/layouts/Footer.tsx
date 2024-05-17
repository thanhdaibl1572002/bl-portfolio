import { FC } from 'react'
import styles from '@/components/layouts/footer.module.sass'
import { useAppSelector } from '@/redux'

const Footer: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
      <footer className={styles[`_container__${theme}`]}>
        
      </footer>
    )
}

export default Footer
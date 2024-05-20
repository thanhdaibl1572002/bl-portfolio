'use client'
import { FC, ReactElement, ReactNode } from 'react'
import '@/app/globals.sass'
import { Provider, store, useAppSelector } from '@/redux/index'
import i18n, { I18nextProvider } from '@/languages'
import { darkColor, getColorLevel, mainColor } from '@/variables/variables'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

interface IRootBodyProps {
  children: ReactNode | ReactElement
}

const RootBody: FC<IRootBodyProps> = ({ children }) => {
  const { theme } = useAppSelector(state => state.theme)
  return (
    <body style={{ background: theme === 'light' ? getColorLevel(mainColor, 3) : darkColor }}>
      <Header />
      <main className='main'>
        {children}
      </main>
      <Footer />
    </body>
  )
}

interface IRootLayoutProps {
  children: ReactNode | ReactElement
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <RootBody>{children}</RootBody>
        </Provider>
      </I18nextProvider>

    </html>
  )
}

export default RootLayout

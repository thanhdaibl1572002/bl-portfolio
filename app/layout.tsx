'use client'
import { FC, ReactElement, ReactNode } from 'react'
import '@/app/globals.sass'
import { Provider, store } from '@/redux/index'
import i18n, { I18nextProvider } from '@/languages'

interface IRootLayoutProps {
  children: ReactNode | ReactElement
}

const RootLayout: FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            {children}
          </Provider>
        </I18nextProvider>
      </body>
    </html>
  )
}

export default RootLayout

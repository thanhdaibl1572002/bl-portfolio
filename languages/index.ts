import i18n from 'i18next'
import { initReactI18next, I18nextProvider, useTranslation } from 'react-i18next'

i18n.use(initReactI18next).init({
    resources: {
        vi: {
            translation: {
                
            }
        },
        en: {
            translation: {
                
            }
        },
    },
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
})

export { I18nextProvider, useTranslation }

export default i18n
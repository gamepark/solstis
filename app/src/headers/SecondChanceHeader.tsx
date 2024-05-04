/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const SecondChanceHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.second-chance')}</>
}

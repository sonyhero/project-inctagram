import Head from 'next/head'

import { useTranslation } from '@/shared/hooks'

type Props = {
  title?: string
  description?: string
}

export const HeadMeta = ({ title, description }: Props) => {
  const { t } = useTranslation()

  return (
    <Head>
      <title>{title ?? 'NextJS App'}</title>
      <meta name="description" content={description ?? t.metaDescription} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
  )
}

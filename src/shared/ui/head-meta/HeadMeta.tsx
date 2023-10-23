import Head from 'next/head'

type Props = {
  title?: string
  description?: string
}

export const HeadMeta = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title ?? 'NextJS App'}</title>
      <meta name="description" content={description ?? 'NextJS Description'} />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  )
}

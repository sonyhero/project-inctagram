import Head from 'next/head'

type PropsType = {
  title?: string
  description?: string
}

export const HeadMeta = (props: PropsType) => {
  const { title, description } = props

  return (
    <Head>
      <title>{title ?? 'NextJS App'}</title>
      <meta name="description" content={description ?? 'NextJS Description'} />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  )
}

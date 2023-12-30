import { ErrorPage } from '@/pages-flat/error-page'
import { getAuthLayout } from '@/shared/providers'

const PageNotFound = () => {
  return <ErrorPage />
}

export default PageNotFound
PageNotFound.getLayout = getAuthLayout

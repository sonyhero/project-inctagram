import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { SearchUsers } from '@/pages-flat/search-users'
import { PATH } from '@/shared/config/routes'
import { getBaseLayout } from '@/shared/providers'

const SearchPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return <SearchUsers />
}

export default SearchPage
SearchPage.getLayout = getBaseLayout

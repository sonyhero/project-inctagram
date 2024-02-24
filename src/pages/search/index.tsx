import { useGetUsersQuery } from '@/features/following/api'
import { getBaseLayout } from '@/shared/providers'

const SearchPage = () => {
  const { data } = useGetUsersQuery({
    pageSize: 4,
    cursor: 29,
  })

  return <div>search</div>
}

export default SearchPage
SearchPage.getLayout = getBaseLayout

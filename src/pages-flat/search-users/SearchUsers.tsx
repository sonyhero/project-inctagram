import React, { useEffect, useState } from 'react'

import s from './SearchUsers.module.scss'

import { useGetUsersQuery } from '@/features/following/api'
import { useDebounce, useTranslation } from '@/shared/hooks'
import { TextField } from '@/shared/ui'

export const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { t } = useTranslation()
  const { data } = useGetUsersQuery({
    pageSize: 12,
    cursor: 0,
    search: searchTerm,
  })

  const debouncedValue = useDebounce<string>(search, 400)

  const handleClearSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    setSearchTerm(debouncedValue)
  }, [debouncedValue])

  console.log(data?.items)

  return (
    <div className={s.searchUsers}>
      <TextField
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        placeholder={t.sidebar.search}
        type={'searchType'}
        value={search}
      />
      <div></div>
    </div>
  )
}

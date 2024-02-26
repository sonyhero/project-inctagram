import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import s from './SearchUsers.module.scss'

import { AvatarOwner } from '@/entities/avatar-owner'
import { useGetUsersQuery } from '@/features/following/api'
import { PATH } from '@/shared/config/routes'
import { useDebounce, useTranslation } from '@/shared/hooks'
import { TextField, Typography } from '@/shared/ui'

export const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { t } = useTranslation()
  const { data } = useGetUsersQuery({
    pageSize: 8,
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

  const mappedUsers = data?.items.map(user => {
    return (
      <div className={s.userBlock} key={user.id}>
        <AvatarOwner width={48} height={48} avatarOwner={user.avatars[0]?.url} />
        <div className={s.infoBlock}>
          <Link className={s.link} href={`${PATH.USER}/${user.id}`}>
            {user.userName}
          </Link>
          <Typography variant={'regular14'} color={'secondary'}>
            {user.firstName} {user.lastName}
          </Typography>
        </div>
      </div>
    )
  })

  return (
    <div className={s.searchUsers}>
      <TextField
        onChangeText={setSearch}
        onSearchClear={handleClearSearch}
        placeholder={t.sidebar.search}
        type={'searchType'}
        value={search}
      />
      <Typography className={s.requestText}>Recent requests</Typography>
      <div className={s.usersList}>{mappedUsers}</div>
    </div>
  )
}

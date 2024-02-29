import React from 'react'

import { useRouter } from 'next/router'

import s from './LogoutModal.module.scss'

import { useLogoutMutation, useMeQuery } from '@/features/auth'
import { clearDescriptionDB, clearPostsDB } from '@/shared/config/draftDataBase'
import { PATH } from '@/shared/config/routes'
import { SocketAPI } from '@/shared/config/socketApi'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Modal, Typography } from '@/shared/ui'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const LogoutModal = ({ open, setOpen }: Props) => {
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const { t } = useTranslation()
  const router = useRouter()

  const userEmail = data?.email ?? 'example@example.com'

  const handleClose = () => {
    setOpen(false)
  }

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        router.push(PATH.SIGN_IN)
        clearPostsDB()
        clearDescriptionDB()
        SocketAPI.socket?.disconnect()
      })
    localStorage.removeItem('access')
    setOpen(false)
  }

  return (
    <>
      <Modal
        showCloseButton={true}
        open={open}
        onClose={handleClose}
        title={t.sidebar.logout}
        titleFirstButton={t.sidebar.yes}
        titleSecondButton={t.sidebar.no}
        callBack={logoutHandler}
        buttonBlockClassName={s.buttonBlock}
      >
        <Typography>
          {t.sidebar.logoutModalDescription} &ldquo;<b>{userEmail}</b>&rdquo;?
        </Typography>
      </Modal>
    </>
  )
}

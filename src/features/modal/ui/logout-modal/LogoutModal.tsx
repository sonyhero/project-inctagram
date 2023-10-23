import React from 'react'

import s from './LogoutModal.module.scss'

import { useLogoutMutation } from '@/features/auth'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Modal, Typography } from '@/shared/ui'

const EMAIL = 'epam@epam.com'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const LogoutModal = ({ open, setOpen }: Props) => {
  const [logout] = useLogoutMutation()
  const { t } = useTranslation()

  const handleClose = () => {
    setOpen(false)
  }

  const logoutHandler = () => {
    logout()
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
          {t.sidebar.logoutModalDescription} &ldquo;<b>{EMAIL}</b>&rdquo;?
        </Typography>
      </Modal>
    </>
  )
}

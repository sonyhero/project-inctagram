import React, { FC } from 'react'

import s from './logout-modal.module.scss'

import { useLogoutMutation } from '@/features/auth'
import { Modal, Typography } from '@/shared/ui'

type PropsType = {
  open: boolean
  setOpen: (value: boolean) => void
}
export const LogoutModal: FC<PropsType> = ({ open, setOpen }) => {
  const email = 'Epam@epam.com'
  const [logout] = useLogoutMutation()
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
        title={'Log Out'}
        titleFirstButton={'Yes'}
        titleSecondButton={'No'}
        callBack={logoutHandler}
        buttonBlockClassName={s.buttonBlock}
      >
        <Typography>
          Are you really want to log out of your account &ldquo;<b>{email}</b>&rdquo;?
        </Typography>
      </Modal>
    </>
  )
}

import React, { useState } from 'react'

import s from './logout-modal.module.scss'

import { Button, Modal, Typography } from '@/shared'

export const LogoutModal = () => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('Epam@epam.com')
  // const [logout] = useLogoutMutation()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant={'primary'} onClick={handleOpen}>
        Logout
      </Button>
      <Modal
        showCloseButton={true}
        open={open}
        onClose={handleClose}
        title={'Log Out'}
        titleFirstButton={'Yes'}
        titleSecondButton={'No'}
        buttonBlockClassName={s.buttonBlock}
        // callBack={() => logout()}
      >
        <Typography>
          Are you really want to log out of your account &ldquo;<b>{email}</b>&rdquo;?
        </Typography>
      </Modal>
    </>
  )
}

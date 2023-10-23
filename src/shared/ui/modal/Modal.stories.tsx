import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Button, Modal, Typography } from '@/shared/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta

export const ModalDemo = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant={'primary'} onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        title={'Test Modal'}
        showCloseButton={true}
        open={open}
        onClose={handleClose}
        titleFirstButton={'Close'}
        titleSecondButton={'Send'}
      >
        <Typography variant={'regular16'}>Content Modal</Typography>
      </Modal>
    </>
  )
}

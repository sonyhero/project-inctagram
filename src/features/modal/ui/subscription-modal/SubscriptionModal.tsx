import s from './SubscriptionModal.module.scss'

import { Modal, Typography } from '@/shared/ui'

type Props = {
  isSuccess?: boolean
  open: boolean
  onClose: () => void
}

export const SubscriptionModal = (props: Props) => {
  const { isSuccess, open, onClose } = props

  const title = isSuccess ? 'Success' : 'Error'

  const content = isSuccess ? (
    <Typography variant={'regular16'}>Payment was successful!</Typography>
  ) : (
    <Typography variant={'regular16'}>Transaction failed. Please, write to support</Typography>
  )

  const titleSecondButton = isSuccess ? 'OK' : 'Back to payment'

  return (
    <Modal
      title={title}
      showCloseButton={true}
      open={open}
      onClose={onClose}
      callBack={onClose}
      titleSecondButton={titleSecondButton}
      contentBoxClassname={s.content}
      buttonBlockClassName={s.button}
    >
      {content}
    </Modal>
  )
}

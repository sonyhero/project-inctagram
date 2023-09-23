import { ComponentProps, FC } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'

import s from './modal.module.scss'

import { Button, Close, Typography } from '@/shared'

type PropsType = {
  open?: boolean
  onClose?: () => void
  showCloseButton?: boolean
  title?: string
  titleFirstButton?: string
  titleSecondButton?: string
  callBack?: () => void
  buttonBlockClassName?: string
} & ComponentProps<'div'>

const modalAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export const Modal: FC<PropsType> = ({
  open = false,
  title,
  onClose,
  children,
  titleFirstButton,
  titleSecondButton,
  showCloseButton = true,
  callBack,
  buttonBlockClassName,
}) => {
  function handleModalClosed() {
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClosed}>
      {open && (
        <DialogPortal>
          <motion.div
            className={s.content}
            variants={modalAnimation}
            initial="hidden"
            animate="visible"
          >
            <DialogOverlay className={s.overlay} />
            <DialogContent className={s.content}>
              <header className={s.header}>
                <DialogTitle asChild>
                  <Typography variant={'h1'}>{title}</Typography>
                </DialogTitle>

                {showCloseButton && (
                  <DialogClose className={s.closeButton}>
                    <Close />
                  </DialogClose>
                )}
              </header>
              <div className={s.contentBox}>{children}</div>
              <div className={buttonBlockClassName}>
                <Button onClick={() => onClose?.()} variant={'outline'}>
                  <Typography className={s.firstButtonText} variant={'h3'}>
                    {titleFirstButton}
                  </Typography>
                </Button>
                <Button variant={'primary'} onClick={callBack}>
                  <Typography variant={'h3'}>{titleSecondButton}</Typography>
                </Button>
              </div>
            </DialogContent>
          </motion.div>
        </DialogPortal>
      )}
    </Dialog>
  )
}

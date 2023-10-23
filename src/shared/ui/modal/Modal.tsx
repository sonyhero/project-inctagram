import { ComponentProps } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'

import s from './Modal.module.scss'

import { Button, Close, Typography } from '@/shared/ui'

type Props = {
  open?: boolean
  onClose?: () => void
  showCloseButton?: boolean
  title?: string
  titleFirstButton?: string
  titleSecondButton?: string
  callBack?: () => void
  buttonBlockClassName?: string
  className?: string
} & ComponentProps<'div'>

const MODAL_ANIMATION = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

export const Modal = (props: Props) => {
  const {
    open = false,
    title,
    onClose,
    children,
    titleFirstButton,
    titleSecondButton,
    showCloseButton = true,
    callBack,
    buttonBlockClassName,
    className,
  } = props

  function handleModalClosed() {
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClosed}>
      {open && (
        <DialogPortal>
          <motion.div variants={MODAL_ANIMATION} initial={'hidden'} animate={'visible'}>
            <DialogOverlay className={s.overlay} />
            <DialogContent className={`${s.content} ${className}`}>
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
                {titleFirstButton && (
                  <Button onClick={callBack} variant={'outline'}>
                    <Typography className={s.firstButtonText} variant={'h3'}>
                      {titleFirstButton}
                    </Typography>
                  </Button>
                )}
                {titleSecondButton && (
                  <Button
                    variant={'primary'}
                    onClick={titleFirstButton ? () => onClose?.() : callBack}
                  >
                    <Typography variant={'h3'}>{titleSecondButton}</Typography>
                  </Button>
                )}
              </div>
            </DialogContent>
          </motion.div>
        </DialogPortal>
      )}
    </Dialog>
  )
}

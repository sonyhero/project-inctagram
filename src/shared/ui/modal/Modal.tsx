import { ComponentProps } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'

import s from './Modal.module.scss'

import { ArrowIosBack, Button, Close, Typography } from '@/shared/ui'

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
  contentBoxClassname?: string
  prevContent?: boolean
  prevClick?: () => void
  nextContent?: boolean
  nextClick?: () => void
  nextContentTitle?: string
  showHeader?: boolean
  isOverlay?: boolean
  secondModal?: boolean
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
    contentBoxClassname,
    prevContent = false,
    prevClick,
    nextContent = false,
    nextClick,
    nextContentTitle,
    showHeader = true,
    isOverlay = true,
    secondModal = false,
  } = props

  function handleModalClosed() {
    onClose?.()
  }

  return (
    <Dialog open={open} onOpenChange={handleModalClosed}>
      {open && (
        <DialogPortal>
          <motion.div variants={MODAL_ANIMATION} initial={'hidden'} animate={'visible'}>
            <DialogOverlay
              className={`${isOverlay ? s.overlay : s.noOverlay} ${secondModal && s.secondModal}`}
            />
            <DialogContent className={`${s.content} ${className}`}>
              {showHeader && (
                <header className={s.header}>
                  {prevContent && <ArrowIosBack onClick={prevClick} className={s.prevContent} />}
                  <DialogTitle asChild>
                    <Typography variant={'h1'}>{title}</Typography>
                  </DialogTitle>

                  <div>
                    {nextContentTitle && (
                      <Button variant={'text'} disabled={nextContent} onClick={nextClick}>
                        {nextContentTitle}
                      </Button>
                    )}
                  </div>

                  {showCloseButton && <Close className={s.closeButton} onClick={onClose} />}
                </header>
              )}
              <div className={`${s.contentBox} ${contentBoxClassname}`}>{children}</div>
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
                    {titleSecondButton}
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

import { ReactNode, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

import s from './DropDownMenu.module.scss'

type Props = {
  trigger?: ReactNode
  items?: {
    id: number
    component: JSX.Element
  }[]
  align?: 'center' | 'end' | 'start'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
}
const motionItem = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const DropDownMenu = ({ items, trigger, align = 'start', side = 'top' }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const itemsForRender = items?.map((item, index) => {
    return (
      <div key={index}>
        {index === items?.length - 1 ? (
          <motion.div variants={motionItem}>
            <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
          </motion.div>
        ) : (
          <>
            <motion.div variants={motionItem}>
              <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
              <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
            </motion.div>
          </>
        )}
      </div>
    )
  })

  const onCloseAutoFocusHandler = () => {
    setIsOpen(false)
  }
  const onClickHandler = () => {
    setIsOpen(true)
  }
  const onOpenChangeHandler = (e: boolean) => {
    setIsOpen(e)
  }
  const onOpenHandler = () => {
    setIsOpen(true)
  }

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={onOpenChangeHandler}>
      <DropdownMenu.Trigger asChild onClick={onOpenHandler}>
        <button
          className={`${s.iconButton} ${isOpen ? s.activeTrigger : ''}`}
          aria-label="Customise options"
        >
          {trigger}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          onClick={onClickHandler}
          onCloseAutoFocus={onCloseAutoFocusHandler}
          align={align}
          side={side}
          className={s.dropdownMenuContent}
          sideOffset={5}
        >
          <motion.div variants={container} initial="hidden" animate="visible">
            {itemsForRender}
          </motion.div>
          <DropdownMenu.Arrow className={s.arrowBox} asChild>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

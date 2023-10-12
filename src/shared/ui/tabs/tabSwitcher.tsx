import { FC } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

import { Typography } from '@/shared'

type PropsType = {
  classname?: string
  options?: any[]
  onChangeCallback?: (value: string) => void
  activeTab?: string
  disabled?: boolean
}
export const TabSwitcher: FC<PropsType> = ({ options, onChangeCallback, classname, activeTab }) => {
  return (
    <div key={activeTab}>
      <Tabs.Root className={s.tabsRoot} onValueChange={onChangeCallback}>
        <Tabs.List className={s.tabsList}>
          {options?.map((tab, index) => {
            return (
              <Tabs.Trigger
                data-state={tab.value === activeTab ? 'active' : 'unActive'}
                className={`${s.tabsTrigger} ${classname}`}
                value={tab.value}
                key={index}
                disabled={tab.disabled ?? false}
              >
                <Typography variant={'h3'}>{tab.value}</Typography>
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
      </Tabs.Root>
    </div>
  )
}
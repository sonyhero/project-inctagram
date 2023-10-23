import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/shared/ui/tabs/TabSwitcher'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: { onChangeCallback: { action: 'tabSwitcher changes' } },
} satisfies Meta<typeof TabSwitcher>

const tabsName = [
  { name: 'Switcher', value: 'Button1', disabled: false },
  { name: 'Switcher', value: 'Button2', disabled: true },
  { name: 'Switcher', value: 'Button3', disabled: true },
]

export default meta
type Story = StoryObj<typeof meta>

export const ShowTabSwitcher: Story = {
  args: {
    options: tabsName,
    activeTab: 'Button2',
  },
}

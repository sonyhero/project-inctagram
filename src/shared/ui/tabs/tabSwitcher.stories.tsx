import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/shared/ui/tabs/tabSwitcher'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: { onChangeCallback: { action: 'tabSwitcher changes' } },
} satisfies Meta<typeof TabSwitcher>

const tabsName = [
  { name: 'Switcher', value: 'Button1', isDisabled: false },
  { name: 'Switcher', value: 'Button2', isDisabled: false, disabled: true },
  { name: 'Switcher', value: 'Button3', isDisabled: false, disabled: true },
]

export default meta
type Story = StoryObj<typeof meta>

export const ShowTabSwitcher: Story = {
  args: {
    options: tabsName,
    activeTab: 'Button2',
  },
}

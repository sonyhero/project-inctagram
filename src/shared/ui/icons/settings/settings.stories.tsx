import { Meta, StoryObj } from '@storybook/react'

import { Settings } from './settings'

const meta = {
  title: 'Components/Icons',
  component: Settings,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Settings>

export default meta
type Story = StoryObj<typeof meta>

export const SettingsIcon: Story = {}

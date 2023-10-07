import { Meta, StoryObj } from '@storybook/react'

import { CheckIcon } from './check-icon'

const meta = {
  title: 'Components/Icons',
  component: CheckIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Check: Story = {}

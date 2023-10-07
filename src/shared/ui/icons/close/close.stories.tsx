import { Meta, StoryObj } from '@storybook/react'

import { Close } from './close'

const meta = {
  title: 'Components/Icons',
  component: Close,
  tags: ['autodocs'],
} satisfies Meta<typeof Close>

export default meta
type Story = StoryObj<typeof meta>

export const CloseIcon: Story = {}

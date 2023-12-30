import { Meta, StoryObj } from '@storybook/react'

import { Size4to5 } from './Size4to5'

const meta = {
  title: 'Components/Icons',
  component: Size4to5,
  tags: ['autodocs'],
} satisfies Meta<typeof Size4to5>

export default meta
type Story = StoryObj<typeof meta>

export const Size4to5Icon: Story = {}

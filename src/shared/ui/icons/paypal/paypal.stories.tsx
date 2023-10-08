import { Meta, StoryObj } from '@storybook/react'

import { Paypal } from './paypal'

const meta = {
  title: 'Components/Icons',
  component: Paypal,
  tags: ['autodocs'],
} satisfies Meta<typeof Paypal>

export default meta
type Story = StoryObj<typeof meta>

export const PaypalIcon: Story = {}

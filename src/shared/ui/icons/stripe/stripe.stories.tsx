import { Meta, StoryObj } from '@storybook/react'

import { Stripe } from './stripe'

const meta = {
  title: 'Components/Icons',
  component: Stripe,
  tags: ['autodocs'],
} satisfies Meta<typeof Stripe>

export default meta
type Story = StoryObj<typeof meta>

export const StripeIcon: Story = {}

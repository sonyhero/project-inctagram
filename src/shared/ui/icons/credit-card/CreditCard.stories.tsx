import { Meta, StoryObj } from '@storybook/react'

import { CreditCard } from './CreditCard'

const meta = {
  title: 'Components/Icons',
  component: CreditCard,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof CreditCard>

export default meta
type Story = StoryObj<typeof meta>

export const CreditCardIcon: Story = {}

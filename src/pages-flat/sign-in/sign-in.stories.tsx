import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/pages-flat/sign-in/sign-in'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Sign_In: Story = {}

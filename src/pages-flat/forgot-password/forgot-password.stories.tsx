import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from '@/pages-flat/forgot-password/forgot-password'

const meta = {
  title: 'Auth/Forgot-Password',
  component: ForgotPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Forgot_Password: Story = {}

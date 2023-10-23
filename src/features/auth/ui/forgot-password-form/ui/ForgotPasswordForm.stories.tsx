import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from '@/features/auth'

const meta = {
  title: 'Auth/Forgot-Password',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Forgot_Password: Story = {}

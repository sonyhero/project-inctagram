import { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/features/auth/ui/sign-up-form/ui/SignUpForm'

const meta = {
  title: 'Auth/SignUp',
  component: SignUpForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const SignUp_Form: Story = {}

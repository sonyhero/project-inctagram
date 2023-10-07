import { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/pages-flat/sign-up/sign-up-form/sign-up-form'

const meta = {
  title: 'Auth/SignUp',
  component: SignUpForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const SignUp_Form: Story = {}

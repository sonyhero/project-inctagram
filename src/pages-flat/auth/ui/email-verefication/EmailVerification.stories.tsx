import { Meta, StoryObj } from '@storybook/react'

import { EmailVerification } from './EmailVerification'

const meta = {
  title: 'Auth/EmailVerification',
  component: EmailVerification,
  tags: ['autodocs'],
} satisfies Meta<typeof EmailVerification>

export default meta
type Story = StoryObj<typeof meta>

export const EmailVerificationStory: Story = {}

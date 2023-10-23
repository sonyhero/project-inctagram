import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from '@/shared/ui/recaptcha/Recaptcha'

const meta = {
  title: 'Components/Recaptcha',
  component: Recaptcha,
  tags: ['autodocs'],
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const RecaptchaStory: Story = {}

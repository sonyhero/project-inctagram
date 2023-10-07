import { Meta, StoryObj } from '@storybook/react'

import { ReCaptcha } from './re-captcha'

const meta = {
  title: 'Components/Icons',
  component: ReCaptcha,
  tags: ['autodocs'],
} satisfies Meta<typeof ReCaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const ReCaptchaIcon: Story = {}

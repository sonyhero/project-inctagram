import { Meta, StoryObj } from '@storybook/react'

import { ReCaptcha } from './ReCaptcha'

const meta = {
  title: 'Components/Icons',
  component: ReCaptcha,
  tags: ['autodocs'],
} satisfies Meta<typeof ReCaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const ReCaptchaIcon: Story = {}

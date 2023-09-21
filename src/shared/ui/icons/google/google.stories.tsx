import { Meta, StoryObj } from '@storybook/react'

import { Google } from './google'

const meta = {
  title: 'Components/Icons',
  component: Google,
  tags: ['autodocs'],
} satisfies Meta<typeof Google>

export default meta
type Story = StoryObj<typeof meta>

export const GoogleIcon: Story = {}

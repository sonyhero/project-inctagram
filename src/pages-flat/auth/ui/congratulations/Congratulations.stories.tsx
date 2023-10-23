import { Meta, StoryObj } from '@storybook/react'

import { Congratulations } from './Congratulations'

const meta = {
  title: 'Auth/Congratulations',
  component: Congratulations,
  tags: ['autodocs'],
} satisfies Meta<typeof Congratulations>

export default meta
type Story = StoryObj<typeof meta>

export const CongratulationsStory: Story = {}

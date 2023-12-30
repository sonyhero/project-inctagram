import { Meta, StoryObj } from '@storybook/react'

import { SizeOriginal } from '@/shared/ui/icons/size-original/SizeOriginal'

const meta = {
  title: 'Components/Icons',
  component: SizeOriginal,
  tags: ['autodocs'],
} satisfies Meta<typeof SizeOriginal>

export default meta
type Story = StoryObj<typeof meta>

export const SizeOriginalIcon: Story = {}

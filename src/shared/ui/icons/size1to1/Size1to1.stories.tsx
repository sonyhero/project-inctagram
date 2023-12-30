import { Meta, StoryObj } from '@storybook/react'

import { Size1to1 } from '@/shared/ui/icons/size1to1/Size1to1'

const meta = {
  title: 'Components/Icons',
  component: Size1to1,
  tags: ['autodocs'],
} satisfies Meta<typeof Size1to1>

export default meta
type Story = StoryObj<typeof meta>

export const Size1to1Icon: Story = {}

import { Meta, StoryObj } from '@storybook/react'

import { ArrowIosUp } from './ArrowIosUp'

const meta = {
  title: 'Components/Icons',
  component: ArrowIosUp,
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowIosUp>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowIosUpIcon: Story = {}

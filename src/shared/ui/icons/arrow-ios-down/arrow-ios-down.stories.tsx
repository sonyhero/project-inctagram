import { Meta, StoryObj } from '@storybook/react'

import { ArrowIosDown } from './arrow-ios-down'

const meta = {
  title: 'Components/Icons',
  component: ArrowIosDown,
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowIosDown>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowIosDownIcon: Story = {}

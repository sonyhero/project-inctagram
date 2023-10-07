import { Meta, StoryObj } from '@storybook/react'

import { ArrowIosBack } from './arrow-ios-back'

const meta = {
  title: 'Components/Icons',
  component: ArrowIosBack,
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowIosBack>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowIosBackIcon: Story = {}

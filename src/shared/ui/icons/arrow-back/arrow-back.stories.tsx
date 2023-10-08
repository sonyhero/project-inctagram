import { Meta, StoryObj } from '@storybook/react'

import { ArrowBack } from './arrow-back'

const meta = {
  title: 'Components/Icons',
  component: ArrowBack,
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowBack>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowBackIcon: Story = {}

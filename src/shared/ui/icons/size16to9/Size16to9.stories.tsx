import { Meta, StoryObj } from '@storybook/react'

import { Size16to9 } from './Size16to9'

const meta = {
  title: 'Components/Icons',
  component: Size16to9,
  tags: ['autodocs'],
} satisfies Meta<typeof Size16to9>

export default meta
type Story = StoryObj<typeof meta>

export const Size16to9Icon: Story = {}

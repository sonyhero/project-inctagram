import { Meta, StoryObj } from '@storybook/react'

import { DoneAll } from './DoneAll'

const meta = {
  title: 'Components/Icons',
  component: DoneAll,
  tags: ['autodocs'],
} satisfies Meta<typeof DoneAll>

export default meta
type Story = StoryObj<typeof meta>

export const DoneAllIcon: Story = {}

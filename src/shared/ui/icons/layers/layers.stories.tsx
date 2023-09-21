import { Meta, StoryObj } from '@storybook/react'

import { Layers } from './layers'

const meta = {
  title: 'Components/Icons',
  component: Layers,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Layers>

export default meta
type Story = StoryObj<typeof meta>

export const LayersIcon: Story = {}

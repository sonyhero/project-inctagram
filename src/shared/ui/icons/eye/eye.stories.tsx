import { Meta, StoryObj } from '@storybook/react'

import { Eye } from './eye'

const meta = {
  title: 'Components/Icons',
  component: Eye,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Eye>

export default meta
type Story = StoryObj<typeof meta>

export const EyeIcon: Story = {}

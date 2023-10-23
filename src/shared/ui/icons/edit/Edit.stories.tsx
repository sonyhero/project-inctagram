import { Meta, StoryObj } from '@storybook/react'

import { Edit } from './Edit'

const meta = {
  title: 'Components/Icons',
  component: Edit,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Edit>

export default meta
type Story = StoryObj<typeof meta>

export const EditIcon: Story = {}

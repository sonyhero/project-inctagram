import { Meta, StoryObj } from '@storybook/react'

import { CongratIcon } from './Congrat'

const meta = {
  title: 'Components/Icons',
  component: CongratIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof CongratIcon>

export default meta
type Story = StoryObj<typeof meta>

export const CongratulationsPicture: Story = {}

import { Meta, StoryObj } from '@storybook/react'

import { PaperPlane } from './paper-plane'

const meta = {
  title: 'Components/Icons',
  component: PaperPlane,
  tags: ['autodocs'],
} satisfies Meta<typeof PaperPlane>

export default meta
type Story = StoryObj<typeof meta>

export const PaperPlaneIcon: Story = {}

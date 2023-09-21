import { Meta, StoryObj } from '@storybook/react'

import { Facebook } from './facebook'

const meta = {
  title: 'Components/Icons',
  component: Facebook,
  tags: ['autodocs'],
} satisfies Meta<typeof Facebook>

export default meta
type Story = StoryObj<typeof meta>

export const FacebookIcon: Story = {}

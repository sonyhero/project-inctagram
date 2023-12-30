import { Meta, StoryObj } from '@storybook/react'

import { RuFlag } from './RuFlag'

const meta = {
  title: 'Components/Icons',
  component: RuFlag,
  tags: ['autodocs'],
} satisfies Meta<typeof RuFlag>

export default meta
type Story = StoryObj<typeof meta>

export const RuFlagIcon: Story = {}

import { Meta, StoryObj } from '@storybook/react'

import { UkFlag } from './uk-flag'

const meta = {
  title: 'Components/Icons',
  component: UkFlag,
  tags: ['autodocs'],
} satisfies Meta<typeof UkFlag>

export default meta
type Story = StoryObj<typeof meta>

export const UkFlagIcon: Story = {}

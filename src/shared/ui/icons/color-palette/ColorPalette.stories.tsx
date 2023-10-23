import { Meta, StoryObj } from '@storybook/react'

import { ColorPalette } from './ColorPalette'

const meta = {
  title: 'Components/Icons',
  component: ColorPalette,
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const ColorPaletteIcon: Story = {}

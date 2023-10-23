import { Meta, StoryObj } from '@storybook/react'

import { VereficationIcon } from './Verefication'

const meta = {
  title: 'Components/Icons',
  component: VereficationIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof VereficationIcon>

export default meta
type Story = StoryObj<typeof meta>

export const VereficationPicture: Story = {}

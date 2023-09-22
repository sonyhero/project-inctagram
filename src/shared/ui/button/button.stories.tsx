import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

import { UkFlag } from '@/shared/ui/icons/uk-flag/uk-flag'

const meta = {
  title: 'Components/Buttons',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline', 'link'],
      control: { type: 'radio' },
    },
    onClick: { action: 'button clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <UkFlag />
        English
      </>
    ),
    disabled: false,
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
    disabled: false,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}

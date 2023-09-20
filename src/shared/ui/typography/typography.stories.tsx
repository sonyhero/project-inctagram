import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular16',
        'bold16',
        'regular14',
        'medium14',
        'bold14',
        'small',
        'sb_small',
        'link',
        's_link',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Some text',
  },
}
export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Some text',
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Some text',
  },
}
export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Some text',
  },
}
export const Regular16: Story = {
  args: {
    variant: 'regular16',
    children: 'Some text',
  },
}
export const Bold16: Story = {
  args: {
    variant: 'bold16',
    children: 'Some text',
  },
}
export const Regular14: Story = {
  args: {
    variant: 'regular14',
    children: 'Some text',
  },
}
export const Medium14: Story = {
  args: {
    variant: 'medium14',
    children: 'Some text',
  },
}
export const Bold14: Story = {
  args: {
    variant: 'bold14',
    children: 'Some text',
  },
}
export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Some text',
  },
}
export const SemiBoldSmall: Story = {
  args: {
    variant: 'sb_small',
    children: 'Some text',
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Some text',
  },
}
export const SmallLink: Story = {
  args: {
    variant: 's_link',
    children: 'Some text',
  },
}

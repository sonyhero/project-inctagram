import { Meta, StoryObj } from '@storybook/react'

import { Privacy } from './privacy'

const meta = {
  title: 'Pages/Privacy',
  component: Privacy,
  tags: ['autodocs'],
} satisfies Meta<typeof Privacy>

export default meta
type Story = StoryObj<typeof meta>

export const TermsOfServicePage: Story = {
  args: {
    text: 'Terms of Service',
  },
}

export const PrivacyPolicyPage: Story = {
  args: {
    text: 'Privacy Policy',
  },
}

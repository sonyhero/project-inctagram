import { Meta, StoryObj } from '@storybook/react'

import { LogoutModal } from '@/features/modal/logout-modal/logout-modal'

const meta = {
  title: 'Features/Logout',
  component: LogoutModal,
  tags: ['autodocs'],
} satisfies Meta<typeof LogoutModal>

export default meta
type Story = StoryObj<typeof meta>

export const Logout: Story = {}

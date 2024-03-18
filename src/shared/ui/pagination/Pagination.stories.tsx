import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/shared/ui/pagination/Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationStory: Story = {
  args: {
    count: 100,
    page: 1,
    onChange: () => {},
    perPage: 5,
    perPageOptions: [
      { id: 1, value: 7 },
      { id: 2, value: 10 },
      { id: 3, value: 20 },
      { id: 4, value: 50 },
      { id: 5, value: 100 },
    ],
    onPerPageChange: () => {},
  },
}

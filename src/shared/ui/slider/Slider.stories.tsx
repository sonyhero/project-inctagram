import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { SuperSlider } from '@/shared/ui/slider/Slider'

const meta = {
  title: 'Components/Slider',
  component: SuperSlider,
  tags: ['autodocs'],
} satisfies Meta<typeof SuperSlider>

export default meta
type Story = StoryObj<typeof meta>

export const ShowSingleSlider: React.FC = () => {
  const [slideValue, setSlideValue] = useState([0])

  return <SuperSlider value={slideValue} setValue={setSlideValue} maxValue={10} showValue={true} />
}
export const SingleSlider: Story = {
  args: {
    value: [0],
    setValue: () => {},
    maxValue: 10,
    showValue: false,
  },
}

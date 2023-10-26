import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Maximize, SuperSlider } from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu/DropDownMenu'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>

export default meta

export const DropdownMenuFirstVariant = () => {
  const [value, setValue] = useState([0])

  const dropDownMenu = [
    {
      id: 1,
      component: (
        <div style={{ width: '124ps' }}>
          <SuperSlider value={value} setValue={setValue} />
        </div>
      ),
    },
  ]

  return <DropDownMenu items={dropDownMenu} trigger={<Maximize />} />
}

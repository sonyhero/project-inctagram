import * as Slider from '@radix-ui/react-slider'

import s from './Slider.module.scss'

import { Typography } from '@/shared/ui'

type Props = {
  value: number[]
  setValue: (value: number[]) => void
  maxValue?: number
  showValue?: boolean
}

export const SuperSlider = (props: Props) => {
  const { value, setValue, maxValue = 10, showValue } = props

  return (
    <div className={s.sliderBlock}>
      {showValue && (
        <div className={s.countBlock}>
          <Typography variant={'regular14'}>{value[0]}</Typography>
        </div>
      )}
      <Slider.Root
        className={s.sliderRoot}
        onValueChange={setValue}
        value={value}
        max={maxValue}
        step={1}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} aria-label="Volume" />
      </Slider.Root>
      {showValue && (
        <div className={s.countBlock}>
          <Typography variant={'regular14'}>{maxValue}</Typography>
        </div>
      )}
    </div>
  )
}

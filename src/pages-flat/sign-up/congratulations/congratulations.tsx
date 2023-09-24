import s from './congratulations.module.scss'

import { Button } from '@/shared/ui/button'
import { CongratIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

export const Congratulations = () => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'} className={s.headText}>
        Congratulations!
      </Typography>
      <Typography variant={'regular16'} className={s.description}>
        Your email has been confirmed
      </Typography>
      <Button variant={'primary'} className={s.signBtn}>
        <Typography variant={'h3'}>Sign In</Typography>
      </Button>
      <CongratIcon className={s.pic} />
    </div>
  )
}

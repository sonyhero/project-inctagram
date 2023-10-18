import { Home } from '@/pages-flat/home'
import { getBaseLayout } from '@/shared/providers/layout/layout'

export default function HomePage() {
  return <Home />
}

HomePage.getLayout = getBaseLayout

import { Home } from '@/pages-flat/home'
import { getBaseLayout } from '@/shared/providers/layout/Layout'

export default function HomePage() {
  return <Home />
}

HomePage.getLayout = getBaseLayout

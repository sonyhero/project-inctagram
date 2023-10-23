import { CreateNewPassword } from '@/pages-flat/auth/ui/create-new-password'
import { getAuthLayout } from '@/shared/providers'

const CreateNewPasswordPage = () => {
  return <CreateNewPassword />
}

export default CreateNewPasswordPage
CreateNewPasswordPage.getLayout = getAuthLayout

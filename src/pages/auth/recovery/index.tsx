import { CreateNewPassword } from '@/pages-flat/create-new-password'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const CreateNewPasswordPage = () => {
  return <CreateNewPassword />
}

export default CreateNewPasswordPage
CreateNewPasswordPage.getLayout = getAuthLayout

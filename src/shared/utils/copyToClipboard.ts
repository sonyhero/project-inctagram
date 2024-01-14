import { toast } from 'react-toastify'

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Ссылка на пост скопирована')
    })
    .catch(() => {
      toast.error('Не удалось скопировать ссылку на пост')
    })
}

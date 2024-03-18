export function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${month}.${day}.${year}`
}

export const getDayMonthTime = (dateString: string, locale: string) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'short', day: '2-digit' } as const

  return date.toLocaleDateString(locale, options)
}

export const getNumericDayMonthTime = (
  dateString: string,
  locale: string,
  addDay: boolean = false
) => {
  const date = new Date(dateString)

  if (addDay) {
    date.setDate(date.getDate() + 1)
  }
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  } as const

  return date.toLocaleDateString(locale, options)
}

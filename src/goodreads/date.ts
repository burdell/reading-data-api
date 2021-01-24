import { format } from 'date-fns'

export function formatReadDate(date: Date) {
  return format(date, 'yyyy/MM/dd')
}

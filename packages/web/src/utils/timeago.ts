import { formatTimeAgo } from '@vueuse/core'

export function customTimeAgo(agoTime: number | Date) {
  return formatTimeAgo(new Date(agoTime), {
    showSecond: true,
    messages: {
      justNow: 'just now',
      past: (n: any) => (n.match(/\d/) ? `${n}` : n),
      future: (n: any) => (n.match(/\d/) ? `in ${n}` : n),
      month: (n: any, past: boolean) =>
        n === 1 ? (past ? 'last month' : 'next month') : `${n} month${n > 1 ? 's' : ''}`,
      year: (n: any, past: boolean) =>
        n === 1 ? (past ? 'last year' : 'next year') : `${n} year${n > 1 ? 's' : ''}`,
      day: (n: any, past: boolean) =>
        n === 1 ? (past ? 'yesterday' : 'tomorrow') : `${n} day${n > 1 ? 's' : ''}`,
      week: (n: any, past: boolean) =>
        n === 1 ? (past ? 'last week' : 'next week') : `${n} week${n > 1 ? 's' : ''}`,
      hour: (n: any) => `${n} hr${n > 1 ? 's' : ''}`,
      minute: (n: any) => `${n} min${n > 1 ? 's' : ''}`,
      second: (n: any) => `${n} sec${n > 1 ? 's' : ''}`,
      invalid: ''
    }
  })
}

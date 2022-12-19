import { register } from 'timeago.js'
// import } from 'dayjs'

function localeFunc(number: number, index: number, totalSec?: number) {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;

  const result = [
    ['just now', 'right now'],
    ['%s sec', 'in %s seconds'],
    ['1 m', 'in 1 minute'],
    ['%s m', 'in %s minutes'],
    ['1 H', 'in 1 hour'],
    ['%s H', 'in %s hours'],
    ['1 D', 'in 1 day'],
    ['%s D', 'in %s days'],
    ['1 W', 'in 1 week'],
    ['%s W', 'in %s weeks'],
    ['1 M', 'in 1 month'],
    ['%s M', 'in %s months'],
    ['1 Y', 'in 1 year'],
    ['%s Y', 'in %s years']
  ][index]

  return result as [string, string]
}

export function customTimeAgo() {
  // register your locale with timeago
  register('customTimeAgo', localeFunc)
}

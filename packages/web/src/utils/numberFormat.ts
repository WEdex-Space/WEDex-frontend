export function formatToFloor(value: number | string, precision: number) {
  return String(value)
    .replace(/\.(\d+)/, (e, $1) => {
      return `.${$1.substr(0, precision)}`
    })
    .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
}

export function formatToFixed(value: number | string, precision: number) {
  return String(value)
    .replace(/\.(\d+)/, (e, $1) => {
      if ($1.length > precision) {
        return `.${Math.round(Number($1.substr(0, precision) + '.' + $1[precision + 1]))}`
      } else {
        return `.${$1.substr(0, precision)}`
      }
    })
    .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
}

export const formatMoney = (value: number | string) => {
  const data = Number(value)
  if (isNaN(data)) {
    return 'parse error'
  }
  return data > 1000000
    ? `${(data / 1000000).toFixed(1).replace(/\.0$/, '')}M`
    : data > 1000
    ? `${(data / 1000).toFixed(1).replace(/\.0$/, '')}K`
    : `${data.toFixed(2).replace(/\.00$/, '')}`
}

export const formatBigNumber = (value: number | string) => {
  const reg = /(\d)(?=(?:\d{3})+$)/g
  return value.toString().replace(reg, '$1,')
}

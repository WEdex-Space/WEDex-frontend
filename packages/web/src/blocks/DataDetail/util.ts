export const timeRangeToSocketMap = (key: string) => {
  return (
    {
      '1m': '1m',
      '5m': '5m',
      '1h': '1h',
      '4h': '4h',
      '6h': '6h',
      '24h': '1d',
      '7d': '7d'
    }[key.toLowerCase()] || '1d'
  )
}

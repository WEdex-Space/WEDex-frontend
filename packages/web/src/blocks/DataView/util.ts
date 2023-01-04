import { TradingDataItem } from '@/components/TradingDataList'

type SocketTimeData = {
  volumeBuys: number
  chainId: number
  dexId: string
  happenAt: string
  pairId: string
  priceAvg: number
  priceEnd: number
  priceMax: number
  priceMin: number
  priceStart: number
  volumeSells: number
  txns: number
  views: number
  volume: number
  liquidity: number
  FDV: number
  MKTCap: number
  trendType: number
  _id: string
  txnsBuys: number
  txnsSells: number
  priceAvgBuys: number
  priceAvgSells: number
  makers: number
  makersBuys: number
  makersSells: number
}

type SocketDataValue = {
  '5m': SocketTimeData
  '1h': SocketTimeData
  '4h': SocketTimeData
  '6h': SocketTimeData
  '1d': SocketTimeData
  tradePair: string
}

export const getPricePercentageFromSocketData = (item?: SocketTimeData) => {
  return item ? ((item.priceEnd - item.priceStart) / item.priceStart).toFixed(2) : '--'
}

export const updatePairListWithSocketData = (item: SocketDataValue, list: TradingDataItem[]) => {
  const targetIndex = list.findIndex(data => {
    return (
      (Array.isArray(data.token) ? data.token.map(e => e.symbol).join('/') : '--') ===
      item.tradePair
    )
  })
  if (targetIndex !== -1) {
    list.splice(targetIndex, 1, {
      ...list[targetIndex],
      originSocketValue: item,
      price: item['1d']?.priceEnd,
      '5m': getPricePercentageFromSocketData(item['5m']),
      '1h': getPricePercentageFromSocketData(item['1h']),
      '4h': getPricePercentageFromSocketData(item['4h']),
      '6h': getPricePercentageFromSocketData(item['6h']),
      '24h': getPricePercentageFromSocketData(item['1d']),
      Txns: item['1d']?.txns,
      Buys: item['1d']?.volumeBuys,
      Sells: item['1d']?.volumeSells,
      Vol: item['1d']?.volume,
      Liquidity: item['1d']?.liquidity,
      FDV: item['1d']?.FDV,
      MKTCap: item['1d']?.MKTCap,
      TrendsUp: item['1d']?.trendType > 0
    })
  }

  return list
}

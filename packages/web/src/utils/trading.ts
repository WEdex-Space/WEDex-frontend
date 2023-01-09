import { TradingDataItem } from '@/components/TradingDataList'
import type { ApiDocuments } from '@/services/a2s.namespace'

type SocketTimeData = ApiDocuments.model_PairReportIMTimeData

type SocketDataValue = ApiDocuments.proto_PairReportIM

export const updatePairListWithSocketData = (
  list: TradingDataItem[],
  SocketData?: SocketDataValue,
  timeInterval?: string
) => {
  return list.map(item => {
    const newIMData: SocketDataValue = SocketData || item.pairReportIM
    if (item.id === newIMData.pairId) {
      return {
        ...item,
        price: getTimeDataFromSocketValue(newIMData, timeInterval)?.price,
        '5m': getTimeDataFromSocketValue(newIMData, '5m')?.priceChange,
        '1h': getTimeDataFromSocketValue(newIMData, '1h')?.priceChange,
        '4h': getTimeDataFromSocketValue(newIMData, '4h')?.priceChange,
        '6h': getTimeDataFromSocketValue(newIMData, '6h')?.priceChange,
        '24h': getTimeDataFromSocketValue(newIMData, '24h')?.priceChange,
        Txns: getTimeDataFromSocketValue(newIMData, timeInterval)?.txns?.total,
        Buys: getTimeDataFromSocketValue(newIMData, timeInterval)?.txns?.buys,
        Sells: getTimeDataFromSocketValue(newIMData, timeInterval)?.txns?.sells,
        Vol: getTimeDataFromSocketValue(newIMData, timeInterval)?.volume?.total,
        views: getTimeDataFromSocketValue(newIMData, timeInterval)?.views,
        TrendsUp: (getTimeDataFromSocketValue(newIMData, timeInterval)?.priceChange || 0) > 0
      }
    } else {
      return item
    }
  })
}

export const getTimeDataFromSocketValue = (value: SocketDataValue, timeInterval?: string) => {
  return value && timeInterval && timeRangeToSocketMap(timeInterval)
    ? (value[timeRangeToSocketMap(timeInterval) as string] as SocketTimeData)
    : null
}

export const timeRangeToSocketMap = (key: string) => {
  return {
    '1m': 'last1m',
    '5m': 'last5m',
    '15m': 'last15m',
    '30m': 'last30m',
    '1h': 'last1h',
    '4h': 'last4h',
    '6h': 'last6h',
    '24h': 'last24h'
  }[key.toLowerCase()]
}

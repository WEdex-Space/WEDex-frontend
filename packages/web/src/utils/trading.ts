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

export const Resolution: Record<string, any> = {
  '1': { name: '1m', label: 'last1m' },
  '5': { name: '5m', label: 'last5m' },
  '15': { name: '30m', label: 'last15m' },
  '30': { name: '30m', label: 'last30m' },
  '60': { name: '1h', label: 'last1h' },
  '240': { name: '4h', label: 'last4h' },
  '360': { name: '6h', label: 'last6h' },
  '1440': { name: '24h', label: 'last24h' }
}

export const timeRangeToSocketMap = (key: string) => {
  const targetKey = Object.keys(Resolution).find(
    mins => Resolution[mins].name === key.toLowerCase()
  )
  return targetKey ? Resolution[targetKey].label : undefined
}

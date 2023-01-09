import { USelect } from '@wedex/components'
import { defineComponent, ref, inject } from 'vue'
import { DataListParamsKey, DataListParamsType } from '@/pages/index'

export const getTrendTypeUpdate = (trendType: number) => {
  const updateParams: DataListParamsType = {
    trendType: trendType,
    rankBy: undefined,
    rankType: -1
  }

  switch (trendType) {
    case 1:
      // Price Change
      // TODO or
      updateParams.or = [
        {
          timeInterval: '5m',
          priceChangeAbsMin: 0.1
        },
        {
          timeInterval: '1h',
          priceChangeAbsMin: 0.1
        },
        {
          timeInterval: '4h',
          priceChangeAbsMin: 0.1
        },
        {
          timeInterval: '6h',
          priceChangeAbsMin: 0.1
        }
      ]
      break
    case 2:
      // price up
      // TODO or
      updateParams.or = [
        {
          timeInterval: '5m',
          priceChangeMin: 0.1
        },
        {
          timeInterval: '1h',
          priceChangeMin: 0.1
        },
        {
          timeInterval: '4h',
          priceChangeMin: 0.1
        },
        {
          timeInterval: '6h',
          priceChangeMin: 0.1
        }
      ]
      break
    case 3:
      // price down
      updateParams.or = [
        {
          timeInterval: '5m',
          priceChangeMax: -0.1
        },
        {
          timeInterval: '1h',
          priceChangeMax: -0.1
        },
        {
          timeInterval: '4h',
          priceChangeMax: -0.1
        },
        {
          timeInterval: '6h',
          priceChangeMax: -0.1
        }
      ]
      break
    case 4:
      // Trading volume
      // TODO volumnChange
      updateParams.or = [
        {
          timeInterval: '5m',
          volumeChangeMin: 0.1
        },
        {
          timeInterval: '1h',
          volumeChangeMin: 0.1
        },
        {
          timeInterval: '4h',
          volumeChangeMin: 0.1
        },
        {
          timeInterval: '6h',
          volumeChangeMin: 0.1
        }
      ]

      break
    case 5:
      // recently added
      updateParams.or = undefined
      updateParams.rankBy = `createdAt`
      updateParams.rankType = -1
      break
    default:
  }
  return updateParams
}

export default defineComponent({
  name: 'TrendTypeSelector',
  props: {
    value: {
      type: String
    }
  },
  setup(props, ctx) {
    const DataListParams = inject<DataListParamsType>(DataListParamsKey)

    const optionsData = ref([
      {
        label: 'Price Change',
        value: 1
      },
      {
        label: 'Price -Up',
        value: 2
      },
      {
        label: 'Price -Down',
        value: 3
      },
      {
        label: 'Trading Volume',
        value: 4
      },
      {
        label: 'Recently added',
        value: 5
      }
    ])

    const handleUpdate = (trendType: number) => {
      if (DataListParams) {
        const updateParams = getTrendTypeUpdate(trendType)
        Object.assign(DataListParams, updateParams)
      }
    }

    return {
      optionsData,
      DataListParams,
      handleUpdate
    }
  },
  render() {
    return (
      <USelect
        class={`mr-4 w-40 selectTransparent`}
        size="small"
        value={this.DataListParams?.trendType}
        options={this.optionsData.map(item => Object.assign({ style: 'font-size: 12px' }, item))}
        onUpdate:value={value => this.handleUpdate(value)}
      ></USelect>
    )
  }
})

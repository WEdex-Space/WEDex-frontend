import { USelect } from '@wedex/components'
import { defineComponent, ref, inject } from 'vue'
import { DataListParamsKey } from '@/pages/index'

export default defineComponent({
  name: 'TrendTypeSelector',
  props: {
    value: {
      type: String
    }
  },
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const optionsData = ref([
      {
        label: 'All Trend Types',
        value: 0
      },
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
        label: 'Trading Volumn',
        value: 4
      },
      {
        label: 'Recently added',
        value: 5
      }
    ])

    return {
      optionsData,
      DataListParams
    }
  },
  render() {
    const handleUpdate = (value: any) => {
      if (this.DataListParams) {
        this.DataListParams.trendType = value
      }
    }

    return (
      <USelect
        class={`mr-4 w-40 selectTransparent`}
        size="small"
        value={this.DataListParams?.trendType}
        options={this.optionsData.map(item => Object.assign({ style: 'font-size: 12px' }, item))}
        onUpdate:value={value => handleUpdate(value)}
      ></USelect>
    )
  }
})

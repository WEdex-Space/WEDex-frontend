import { USelect } from '@wedex/components'
import { CustomOutlined, ExportOutlined } from '@wedex/icons'
import { defineComponent, ref } from 'vue'

const footerCellClass =
  'border-l-1 border-color-border 2xl:px-7 px-3 leading-10 cursor-pointer hover:text-color2'
const footerCellIconClass = 'w-4 h-4 align-middle mx-1 -mt-[2px]'
const footerListCellClass = '2xl:px-7 px-3 border-r-1 border-color-border cursor-default'

export default defineComponent({
  name: 'MainFooter',
  setup() {
    const formData = ref({
      range: 5
    })

    const rangeData = ref([
      {
        label: 'Last 5 mins',
        value: 1
      },
      {
        label: 'Last 1 hour',
        value: 2
      },
      {
        label: 'Last 4 hours',
        value: 3
      },
      {
        label: 'Last 6 hours',
        value: 4
      },
      {
        label: 'Last 24 hours',
        value: 5
      }
    ])

    return {
      formData,
      rangeData
    }
  },
  render() {
    return (
      <div class="border-color-border flex border-t-1 h-10 text-color3 text-[12px]">
        <ul class="flex flex-1 items-center">
          <li class={footerListCellClass}>
            Tokens:<span class="text-color1">1234</span>
          </li>
          <li class={footerListCellClass}>
            Networks:<span class="text-color1">1234</span>
          </li>
          <li class={footerListCellClass}>
            DEXes:<span class="text-color1">1234</span>
          </li>
          <li class={footerListCellClass}>
            Pools:<span class="text-color1">1234</span>
          </li>
          <li class={footerListCellClass}>
            24h Txns:<span class="text-color1">1234</span>
          </li>
          <li class={footerListCellClass}>
            24h Volumn:<span class="text-color1">1234</span>
          </li>
        </ul>
        <div class={`border-l-1 border-color-border w-40`}>
          <USelect
            class={`selectTransparent`}
            size="small"
            placeholder="Networks"
            clearable
            v-model:value={this.formData.range}
            options={this.rangeData}
            onUpdate:value={value => (this.formData.range = value)}
          ></USelect>
        </div>
        <div class={footerCellClass}>
          <CustomOutlined class={footerCellIconClass} />
          Customize
        </div>
        <div class={footerCellClass}>
          <ExportOutlined class={footerCellIconClass} />
          Export
        </div>
      </div>
    )
  }
})

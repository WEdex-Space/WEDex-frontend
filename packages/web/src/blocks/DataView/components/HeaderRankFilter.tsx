import { defineComponent, inject, computed } from 'vue'
import style from './HeaderTagFilter.module.css'
import { DataListParamsKey } from '@/pages/index'
import { timeRangeToSocketMap } from '@/utils/trading'

export default defineComponent({
  name: 'HeaderRankFilter',
  props: {
    value: {
      type: Number
    }
  },
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const tagData = computed(() =>
      DataListParams?.timeInterval
        ? [
            {
              name: 'Volume',
              value: `pairReportIM.${timeRangeToSocketMap(
                DataListParams.timeInterval
              )}.volume.total`
            },
            {
              name: 'Txns',
              value: `pairReportIM.${timeRangeToSocketMap(DataListParams.timeInterval)}.txns.total`
            }
          ]
        : []
    )

    return {
      tagData,
      DataListParams
    }
  },
  render() {
    const handleClick = (item: any) => {
      if (this.DataListParams) {
        this.DataListParams.rankBy = item.value
      }
    }

    return (
      <ul class="flex items-center">
        {this.tagData.map(item => (
          <li
            class={[
              style.subNavItem,
              `${
                this.DataListParams && this.DataListParams.rankBy === item.value
                  ? style.subNavItemCur
                  : ''
              }`
            ]}
            onClick={() => handleClick(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    )
  }
})

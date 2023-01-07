import { defineComponent, ref, inject } from 'vue'
import style from './HeaderTagFilter.module.css'
import { DataListParamsKey } from '@/pages/index'

export default defineComponent({
  name: 'HeaderGainerFilter',
  props: {
    value: {
      type: Number
    }
  },
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const tagData = ref([
      {
        name: 'Top Gainers',
        value: -1
      },
      {
        name: 'Top Losers',
        value: 1
      }
    ])

    return {
      tagData,
      DataListParams
    }
  },
  render() {
    const handleClick = (item: any) => {
      if (this.DataListParams) {
        this.DataListParams.rankType = item.value
      }
    }

    return (
      <ul class="flex items-center">
        {this.tagData.map(item => (
          <li
            class={[
              style.subNavItem,
              `${
                this.DataListParams && this.DataListParams.rankType === item.value
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

import { defineComponent, ref, inject } from 'vue'
import { DataListParamsKey } from '../index'
import style from './HeaderTagFilter.module.css'

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
        value: 1
      },
      {
        name: 'Top Losers',
        value: 2
      },
      {
        name: 'Top Volumn',
        value: 3
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
        if (this.DataListParams.rankBy === item.value) {
          this.DataListParams.rankBy = null
        } else {
          this.DataListParams.rankBy = item.value
        }
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

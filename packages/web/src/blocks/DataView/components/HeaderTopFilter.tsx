import { defineComponent, ref, inject } from 'vue'
import style from './HeaderTagFilter.module.css'
import { DataListParamsKey } from '@/pages/index'

export default defineComponent({
  name: 'HeaderTopFilter',
  props: {
    value: {
      type: String
    }
  },
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const tagData = ref([
      {
        name: 'Top10',
        value: 10
      },
      {
        name: 'Top50',
        value: 50
      },
      {
        name: 'Top100',
        value: 100
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
        if (this.DataListParams.size === item.value) {
          this.DataListParams.size = 20
          this.DataListParams.disablePaginate = false
        } else {
          this.DataListParams.page = 1
          this.DataListParams.size = item.value
          this.DataListParams.disablePaginate = true
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
                this.DataListParams && this.DataListParams.size === item.value
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

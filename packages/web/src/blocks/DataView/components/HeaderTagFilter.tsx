import { defineComponent, computed, inject } from 'vue'
import style from './HeaderTagFilter.module.css'
import { useCategory } from '@/hooks'
import { DataListParamsKey } from '@/pages/index'

export default defineComponent({
  name: 'HeaderTagFilter',
  props: {
    value: {
      type: String
    }
  },
  setup(props, ctx) {
    const categoryHook = useCategory()
    const DataListParams = inject(DataListParamsKey)

    const tagData = computed(() => [
      {
        name: 'All',
        value: undefined
      },
      ...categoryHook.list.value.map(item => {
        return {
          name: item,
          value: item
        }
      })
    ])

    return {
      tagData,
      DataListParams
    }
  },
  render() {
    return (
      <ul class="flex items-center">
        {this.tagData.map(item => (
          <li
            class={[
              style.subNavItem,
              `${
                this.DataListParams && this.DataListParams.tag === item.value
                  ? style.subNavItemCur
                  : ''
              }`
            ]}
            onClick={() => this.DataListParams && (this.DataListParams.tag = item.value)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    )
  }
})

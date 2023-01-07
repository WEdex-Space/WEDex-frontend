import { defineComponent, ref, inject, watch } from 'vue'
import style from './HeaderTagFilter.module.css'
import { DataListParamsKey, DefaultPageSize } from '@/pages/index'

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

    const currentIndex = ref<number | undefined>()

    // set query filter
    watch(
      () => currentIndex.value,
      () => {
        if (DataListParams) {
          if (currentIndex.value !== undefined) {
            DataListParams.size = tagData.value[currentIndex.value].value
            DataListParams.page = 1
          } else {
            DataListParams.size = DefaultPageSize
          }

          DataListParams.disablePaginate = currentIndex.value !== undefined
        }
      }
    )

    return {
      currentIndex,
      tagData,
      DataListParams
    }
  },
  render() {
    return (
      <ul class="flex items-center">
        {this.tagData.map((item, index: number) => (
          <li
            class={[style.subNavItem, `${this.currentIndex === index ? style.subNavItemCur : ''}`]}
            onClick={() => (this.currentIndex = this.currentIndex === index ? undefined : index)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    )
  }
})

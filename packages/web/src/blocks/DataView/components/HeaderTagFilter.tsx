import { defineComponent, ref, inject } from 'vue'
import { DataListParamsKey } from '../index'
import style from './HeaderTagFilter.module.css'

export default defineComponent({
  name: 'HeaderTagFilter',
  props: {
    value: {
      type: String
    }
  },
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const tagData = ref([
      {
        name: 'All',
        value: null
      },
      {
        name: 'Defi',
        value: 'Defi'
      },
      {
        name: 'DEX',
        value: 'DEX'
      },
      {
        name: 'NFT',
        value: 'NFT'
      },
      {
        name: 'Gaming',
        value: 'Gaming'
      },
      {
        name: 'Layer-1',
        value: 'Layer-1'
      },
      {
        name: 'Metaverse',
        value: 'Metaverse'
      }
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

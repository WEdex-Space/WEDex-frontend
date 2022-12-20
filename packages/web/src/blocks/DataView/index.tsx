import { defineComponent, ref, provide, InjectionKey } from 'vue'
import DataList from './DataList'
import MainFooter from './MainFooter'
import MainHeader from './MainHeader'

export type DataListParamsType = {
  chainId: any[]
  type: number | null
  DEXe: any[]
  tag: string | null
  sortMethod: string | null
  page: number
  size: number
  disablePaginate: boolean
  trendType: number | null
  rankBy: number | null
}

export const DataListParamsKey = Symbol() as InjectionKey<DataListParamsType>

export default defineComponent({
  name: 'DataView',
  setup(props, ctx) {
    const DataListParams = ref<DataListParamsType>({
      chainId: [],
      type: 2,
      DEXe: [],
      tag: null,
      sortMethod: null,
      page: 1,
      size: 20,
      disablePaginate: false,
      trendType: 0,
      rankBy: null
    })

    provide(DataListParamsKey, DataListParams.value)

    return {
      DataListParams
    }
  },
  render() {
    return (
      <div class="flex flex-col">
        <MainHeader />
        <DataList class="flex-1" />
        <MainFooter />
      </div>
    )
  }
})

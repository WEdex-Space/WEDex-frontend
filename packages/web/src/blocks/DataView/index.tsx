import { defineComponent } from 'vue'
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

export default defineComponent({
  name: 'DataView',
  setup(props, ctx) {
    return {}
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

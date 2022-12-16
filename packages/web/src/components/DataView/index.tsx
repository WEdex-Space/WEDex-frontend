import { defineComponent } from 'vue'
import DataList from './DataList'
import MainHeader from './MainHeader'

export default defineComponent({
  name: 'DataView',
  setup() {
    return {}
  },
  render() {
    return (
      <div class="flex flex-col">
        <MainHeader />
        <DataList class="flex-1" />
        <div class="border-color-border border-t-1">foot filter</div>
      </div>
    )
  }
})

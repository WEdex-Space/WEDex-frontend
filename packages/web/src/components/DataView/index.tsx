import { defineComponent } from 'vue'
import DataList from './DataList'
import MainFooter from './MainFooter'
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
        <MainFooter />
      </div>
    )
  }
})

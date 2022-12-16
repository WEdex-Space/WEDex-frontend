import { defineComponent } from 'vue'
import MainHeader from './MainHeader'

export default defineComponent({
  name: 'DataViewList',
  setup() {
    return {}
  },
  render() {
    return (
      <div class="flex flex-col">
        <MainHeader />
        <div class="flex-1">DataViewList</div>
        <div class="border-color-border border-t-1">foot filter</div>
      </div>
    )
  }
})

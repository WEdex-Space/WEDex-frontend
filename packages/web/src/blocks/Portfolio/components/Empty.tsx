import { PortfolioOutlined } from '@wedex/icons'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WatchListEmpty',
  setup() {
    return {}
  },
  render() {
    return (
      <div class="text-center py-15 leading-6">
        <PortfolioOutlined class="h-6 mb-2 w-6" />
        <p>Get started to track your portfolio </p>
      </div>
    )
  }
})

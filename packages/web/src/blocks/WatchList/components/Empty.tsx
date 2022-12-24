import { StarOutlined } from '@wedex/icons'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WatchListEmpty',
  setup() {
    return {}
  },
  render() {
    return (
      <div class="text-center py-15 leading-6">
        <StarOutlined class="h-6 mb-2 w-6" />
        <p>Your watchlist is empty</p>
        <p class="text-primary">+ Go to find your favorite tokens</p>
      </div>
    )
  }
})

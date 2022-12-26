import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Alerts',
  setup() {
    return {}
  },
  render() {
    return (
      <div class="flex flex-col h-full relative">
        <div class="border-color-border flex border-b-1 h-14 items-center">
          <strong class="flex-1 mx-5">Alerts</strong>
        </div>
      </div>
    )
  }
})

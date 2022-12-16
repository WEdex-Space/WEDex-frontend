import { NDataTable } from 'naive-ui'
import { defineComponent } from 'vue'

export const UTable = defineComponent({
  name: 'UTable',
  extends: NDataTable,
  setup(props, ctx) {
    return () => <NDataTable {...props} v-slots={ctx.slots} />
  }
})

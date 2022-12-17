import { NDataTable } from 'naive-ui'
import type { DataTableColumn } from 'naive-ui'
import { defineComponent } from 'vue'

export type DataTableColumnType = DataTableColumn

export const UTable = defineComponent({
  name: 'UTable',
  extends: NDataTable,
  setup(props, ctx) {
    return () => <NDataTable {...props} v-slots={ctx.slots} />
  }
})

import { UPopover } from '@wedex/components'
import { defineComponent, ref, inject } from 'vue'
import { DataListParamsKey } from '../index'

export type MultiSelectorValueType = string | number | null
export type MultiSelectorOptionType = {
  label: string
  value: MultiSelectorValueType
  icon?: string
}

export default defineComponent({
  name: 'CustomizeFilter',
  emits: ['change'],
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const tipRef = ref()

    const handleSave = () => {
      console.log('handleSave')
      tipRef.value && tipRef.value.setShow?.(false)
    }

    const handleClose = () => {
      console.log('handleClose')
    }

    return {
      DataListParams,
      tipRef,
      handleSave,
      handleClose
    }
  },
  render() {
    return (
      <UPopover
        ref={ref => (this.tipRef = ref)}
        trigger="click"
        placement="top"
        raw={true}
        arrowStyle={{ background: '#2C3138' }}
        on-update:show={(show: boolean) => !show && this.handleClose()}
        v-slots={{
          trigger: () => (this.$slots.default ? this.$slots.default() : 'Customize'),
          default: () => (
            <div class="border border-color-border rounded bg-bg2 text-xs min-h-30 p-5 text-color3 w-90">
              CustomizeFilter
            </div>
          )
        }}
      />
    )
  }
})

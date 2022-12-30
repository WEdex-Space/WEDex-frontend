import { UPopover, UDatePicker, UButton } from '@wedex/components'
import { defineComponent, ref, PropType } from 'vue'
import { useGlobalConfigStore } from '@/stores'

type RangeType = {
  from: number
  to: number
}

export default defineComponent({
  name: 'DateRangeFilterPopover',
  emits: ['change'],
  props: {
    values: {
      type: Object as PropType<RangeType>,
      default() {
        return {
          from: 0,
          to: 0
        }
      }
    },
    onChange: {
      type: Function
    }
  },
  setup(props, ctx) {
    const globalConfigStore = useGlobalConfigStore()
    const formData = ref<RangeType>(Object.assign({}, props.values) as RangeType)
    const tipRef = ref()

    const closeSelfModal = () => {
      tipRef.value && tipRef.value.setShow?.(false)
    }

    const handleClear = () => {
      closeSelfModal()
      props.onChange &&
        props.onChange({
          from: 0,
          to: 0
        })
    }

    const handleSave = () => {
      closeSelfModal()
      props.onChange && props.onChange(formData.value)
    }

    // when open, sync props value
    const handleVisibleUpdate = (show: boolean) => {
      if (show) {
        formData.value = Object.assign({}, props.values) as RangeType
      }
    }

    const handlePickDate = (
      value: [number, number] | null,
      formattedValue: [string, string] | null
    ) => {
      // console.log(value, formattedValue)
      formData.value = {
        from: value ? value[0] : 0,
        to: value ? value[1] : 0
      }
    }

    return {
      globalConfigStore,
      formData,
      tipRef,
      closeSelfModal,
      handleClear,
      handleSave,
      handleVisibleUpdate,
      handlePickDate
    }
  },
  render() {
    return (
      <UPopover
        ref={ref => (this.tipRef = ref)}
        trigger="click"
        placement="bottom"
        raw={true}
        arrowStyle={{ background: this.globalConfigStore.theme === 'dark' ? '#2C3138' : '#F5F5F5' }}
        on-update:show={this.handleVisibleUpdate}
        v-slots={{
          trigger: () =>
            this.$slots.default
              ? this.$slots.default(this.values?.from || this.values?.to)
              : 'Customize',
          default: () => (
            <div class="border border-color-border rounded bg-bg2 p-4 text-color3 ">
              <UDatePicker
                panel
                type="daterange"
                actions={null}
                onUpdate:value={this.handlePickDate}
              />
              <div class="flex mt-4 gap-2 justify-end">
                <UButton
                  type="primary"
                  ghost
                  size="small"
                  class="px-5"
                  onClick={() => this.handleClear()}
                >
                  Clear
                </UButton>
                <UButton
                  type="primary"
                  size="small"
                  class="px-5 text-color1 !hover:text-color2"
                  onClick={() => this.handleSave()}
                >
                  Apply
                </UButton>
              </div>
            </div>
          )
        }}
      />
    )
  }
})

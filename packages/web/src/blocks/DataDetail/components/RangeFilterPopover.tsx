import { UPopover, UForm, UFormItem, UInputNumber, UButton } from '@wedex/components'
import { defineComponent, ref, PropType } from 'vue'

type RangeType = {
  from: number
  to: number
}

export default defineComponent({
  name: 'RangeFilterPopover',
  emits: ['change'],
  props: {
    value: {
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
    },
    inputProps: {
      type: Object as PropType<{
        prefix: string
        suffix: string
      }>
    }
  },
  setup(props, ctx) {
    const formData = ref<RangeType>(Object.assign({}, props.value))
    const tipRef = ref()

    const options = ref([
      {
        label: 'All',
        value: ''
      },
      {
        label: 'Buy',
        value: 'Buy'
      },
      {
        label: 'Sell',
        value: 'Sell'
      }
    ])

    const closeSelfModal = () => {
      tipRef.value && tipRef.value.setShow?.(false)
    }

    const handleSave = () => {
      closeSelfModal()
      props.onChange && props.onChange(formData.value)
    }

    // when open, sync props value
    const handleVisibleUpdate = (show: boolean) => {
      if (show) {
        formData.value = Object.assign({}, props.value)
      }
    }

    return {
      options,
      formData,
      tipRef,
      closeSelfModal,
      handleSave,
      handleVisibleUpdate
    }
  },
  render() {
    return (
      <UPopover
        ref={ref => (this.tipRef = ref)}
        trigger="click"
        placement="bottom"
        raw={true}
        arrowStyle={{ background: '#2C3138' }}
        on-update:show={this.handleVisibleUpdate}
        v-slots={{
          trigger: () =>
            this.$slots.default
              ? this.$slots.default(this.value.from || this.value.to)
              : 'Customize',
          default: () => (
            <div class="border border-color-border rounded bg-bg2 p-4 text-color3 w-55">
              <UForm size="small">
                <UFormItem label="From">
                  <UInputNumber
                    class="w-full"
                    value={this.formData.from}
                    min={0}
                    v-slots={{
                      prefix: () => this.inputProps?.prefix,
                      suffix: () => this.inputProps?.suffix
                    }}
                    onUpdate:value={value => (this.formData.from = value || 0)}
                  />
                </UFormItem>
                <UFormItem label="To">
                  <UInputNumber
                    class="w-full"
                    value={this.formData.to}
                    min={0}
                    v-slots={{
                      prefix: () => this.inputProps?.prefix,
                      suffix: () => this.inputProps?.suffix
                    }}
                    onUpdate:value={value => (this.formData.to = value || 0)}
                  />
                </UFormItem>
              </UForm>
              <div class="flex mt-4 gap-2 justify-end">
                <UButton
                  type="primary"
                  ghost
                  size="small"
                  class="px-5"
                  onClick={() => this.closeSelfModal()}
                >
                  Cancel
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

import { UPopover, UInput, UButton } from '@WEDex/components'
import { ArrowDownOutlined } from '@WEDex/icons'
import { defineComponent, PropType, ref, computed, watch } from 'vue'

export type MultiSelectorValueType = string | number | null
export type MultiSelectorOptionType = {
  label: string
  value: MultiSelectorValueType
  icon?: string
}

export default defineComponent({
  name: 'MultiSelector',
  props: {
    class: {
      type: String
    },
    value: {
      type: Array as PropType<MultiSelectorValueType[]>
    },
    options: {
      type: Array as PropType<MultiSelectorOptionType[]>,
      default: 'activity'
    },
    placeholder: {
      type: String,
      default: 'Please Select'
    },
    customRender: {
      type: Function as PropType<
        (values: MultiSelectorValueType[], valueObjs: MultiSelectorOptionType[]) => any
      >
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const tipRef = ref()
    const optionSelectedMap = ref<{ [key: string | number]: any }>({})
    const searchKeywords = ref('')

    const optionSelect = computed(() => {
      return Object.keys(optionSelectedMap.value)
    })

    const handleOptionClick = (option: MultiSelectorOptionType) => {
      if (option.value === null) {
        optionSelectedMap.value = {}
      } else {
        optionSelectedMap.value[option.value] = option
      }
    }

    const finnalOptions = computed<MultiSelectorOptionType[]>(() => {
      if (searchKeywords.value.length) {
        const pattern = new RegExp(searchKeywords.value.toLowerCase())
        return props.options.filter(opt => pattern.test(opt.label.toLowerCase()))
      }
      return props.options
    })

    const handleSave = () => {
      ctx.emit('change', optionSelect.value)
      tipRef.value && tipRef.value.setShow?.(false)
    }

    const syncPropValue = () => {
      if (props.value?.length) {
        const result: { [key: string | number]: any } = {}
        props.value.map(key => {
          const targetIndex = props.options.findIndex(opt => String(opt.value) === String(key))
          if (key !== null && targetIndex !== -1) {
            result[key] = props.options[targetIndex]
          }
        })
        optionSelectedMap.value = result
      } else {
        optionSelectedMap.value = {}
      }
    }

    const handleClose = () => {
      syncPropValue()
    }

    watch(() => props.value, syncPropValue, {
      immediate: true
    })

    return {
      tipRef,
      optionSelectedMap,
      optionSelect,
      handleOptionClick,
      searchKeywords,
      finnalOptions,
      handleSave,
      handleClose
    }
  },
  render() {
    const renderLableFromValues = () => {
      if (this.optionSelect.length) {
        return this.optionSelect.map(val => this.optionSelectedMap[val].label)
      }
      return this.placeholder
    }

    return (
      <UPopover
        ref={ref => (this.tipRef = ref)}
        trigger="click"
        placement="bottom"
        raw={true}
        arrowStyle={{ background: '#2C3138' }}
        on-update:show={(show: boolean) => !show && this.handleClose()}
        v-slots={{
          trigger: () => (
            <div
              class={`cursor-pointer flex items-center select-none hover:text-primary ${this.class}`}
            >
              <div class="px-1">
                {typeof this.customRender === 'function'
                  ? this.customRender(
                      this.optionSelect,
                      this.optionSelect.map(key => this.optionSelectedMap[key])
                    )
                  : renderLableFromValues()}
              </div>
              <ArrowDownOutlined class="h-3 ml-1 w-3" />
            </div>
          ),
          default: () => (
            <div class="border border-color-border rounded bg-bg2 text-xs min-h-30 p-5 text-color3 w-90">
              <div>
                <UInput
                  class="mb-5"
                  size="small"
                  value={this.searchKeywords}
                  on-update:value={(value: string) => (this.searchKeywords = value.trim())}
                  clearable
                />
              </div>
              {this.$slots.total && <div class="mb-2">{this.$slots.total()}</div>}
              <ul class="mb-6 grid gap-2.5 grid-cols-3">
                {this.finnalOptions.map(option => (
                  <li
                    class={`flex items-center justify-center cursor-pointer bg-bg3 rounded-sm text-color1 hover:bg-primary-bg px-1 h-6 ${
                      (option.value !== null && this.optionSelectedMap[option.value]) ||
                      (!this.optionSelect.length && option.value === null)
                        ? 'bg-primary-bg text-primary'
                        : ''
                    }`}
                    onClick={() => this.handleOptionClick(option)}
                  >
                    {option.icon && <img src={option.icon} class="h-4 mr-1 w-4" />}
                    <span class="truncate" title={option.label}>
                      {option.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div class="flex justify-end">
                <UButton
                  type="primary"
                  ghost
                  size="small"
                  class="px-5"
                  onClick={() => this.handleSave()}
                >
                  Save
                </UButton>
              </div>
            </div>
          )
        }}
      />
    )
  }
})

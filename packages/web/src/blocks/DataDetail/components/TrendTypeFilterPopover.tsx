import { UPopover } from '@wedex/components'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TrendTypeFilterPopover',
  props: {
    value: {
      type: String,
      default: ''
    },
    onChange: {
      type: Function
    }
  },
  setup(props, ctx) {
    const modalValue = ref(props.value)
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

    const handleClick = (value: string) => {
      modalValue.value = value
      closeSelfModal()
      props.onChange && props.onChange(value)
    }

    return {
      options,
      modalValue,
      tipRef,
      handleClick,
      closeSelfModal
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
        v-slots={{
          trigger: () => (this.$slots.default ? this.$slots.default(!!this.value) : 'Customize'),
          default: () => (
            <div class="border border-color-border rounded bg-bg2 p-2 text-color3 w-20">
              <ul>
                {this.options.map(item => (
                  <li
                    class={`cursor-pointer py-1.5 rounded-sm text-center text-color1 hover:text-primary hover:bg-bg3 ${
                      this.modalValue === item.value ? 'text-primary' : ''
                    }`}
                    onClick={() => this.handleClick(item.value)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      />
    )
  }
})

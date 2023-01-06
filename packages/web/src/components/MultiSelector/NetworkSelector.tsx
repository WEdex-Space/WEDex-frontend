import { defineComponent, PropType, computed } from 'vue'
import {
  default as MultiSelector,
  MultiSelectorOptionType,
  MultiSelectorValueType
} from '@/components/MultiSelector'
import Overlap from '@/components/Overlap'
import { useNetwork } from '@/hooks'

export default defineComponent({
  name: 'NetworkSelector',
  props: {
    value: {
      type: Array as PropType<MultiSelectorValueType[]>
    },
    options: {
      type: Array as PropType<MultiSelectorOptionType[]>
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const networkHook = useNetwork()

    const networksOptions = computed<MultiSelectorOptionType[]>(() => [
      {
        label: 'All Networks',
        value: null
      },
      ...networkHook.list.value.map(item => {
        return {
          label: item.name as string,
          value: item.chainId,
          icon: item.logo
        }
      })
    ])

    const handleChange = (params: any) => {
      ctx.emit('change', params)
    }

    return {
      handleChange,
      networksOptions
    }
  },
  render() {
    return (
      <MultiSelector
        placeholder="Networks"
        value={this.value}
        options={this.options || this.networksOptions}
        onChange={this.handleChange}
        customRender={(values: MultiSelectorValueType[], valueObjs: MultiSelectorOptionType[]) =>
          valueObjs.length ? (
            <div
              class="inline-block whitespace-nowrap"
              title={valueObjs.map(item => item.label).join('/')}
            >
              <Overlap
                nodes={valueObjs.map(item => (
                  <img src={item.icon} />
                ))}
              />
            </div>
          ) : (
            'Networks'
          )
        }
        v-slots={{
          total: () => (
            <>
              Networks:{' '}
              <span class="text-color1">{` ${
                (this.options || this.networksOptions).filter(e => e.value).length
              }`}</span>
            </>
          )
        }}
      />
    )
  }
})

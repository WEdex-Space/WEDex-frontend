import { defineComponent, PropType } from 'vue'
import {
  default as MultiSelector,
  MultiSelectorOptionType,
  MultiSelectorValueType
} from '@/components/MultiSelector'
import Overlap from '@/components/Overlap'

export default defineComponent({
  name: 'NetworkSelector',
  props: {
    value: {
      type: Array as PropType<MultiSelectorValueType[]>
    },
    options: {
      type: Array as PropType<MultiSelectorOptionType[]>,
      default: 'activity'
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const handleChange = (params: any) => {
      ctx.emit('change', params)
    }

    return {
      handleChange
    }
  },
  render() {
    return (
      <MultiSelector
        placeholder="Networks"
        value={this.value}
        options={this.options}
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
              Networks: <span class="text-color1">{` ${this.options.length}`}</span>
            </>
          )
        }}
      />
    )
  }
})

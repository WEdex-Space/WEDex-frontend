import { defineComponent, PropType, ref, watch, computed } from 'vue'
import {
  default as MultiSelector,
  MultiSelectorOptionType,
  MultiSelectorValueType
} from '@/components/MultiSelector'
import Overlap from '@/components/Overlap'
import { services } from '@/services'
import type { ApiDocuments } from '@/services/a2s.namespace'

export default defineComponent({
  name: 'DexSelector',
  props: {
    value: {
      type: Array as PropType<MultiSelectorValueType[]>
    },
    chainIds: {
      type: Array as PropType<number[]>
    },
    keyword: {
      type: String
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const list = ref<ApiDocuments.proto_DEXResponse[]>([])

    const loading = ref(false)
    const getDexList = async () => {
      if (!list.value.length && !loading.value) {
        loading.value = true
        const { error, data } = await services['DEX@get-dex-list']({
          ad: !props.chainIds?.length && !props.keyword,
          chainIds: props.chainIds,
          keyword: props.keyword
        })
        if (!error) {
          list.value = data?.list || []
        } else {
          list.value = []
        }
        loading.value = false
      }
    }

    watch(
      [props.chainIds, props.keyword],
      () => {
        getDexList()
      },
      {
        immediate: true
      }
    )

    const options = computed(() => [
      {
        label: 'All DEXes',
        value: null
      },
      ...list.value.map(item => {
        return {
          label: item.name as string,
          value: item._id,
          icon: item.logo
        }
      })
    ])

    const handleChange = (params: any) => {
      ctx.emit('change', params)
    }

    return {
      options,
      handleChange
    }
  },
  render() {
    return (
      <MultiSelector
        placeholder="DEXes"
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
            'DEXes'
          )
        }
        v-slots={{
          total: () => (
            <>
              DEXes:{' '}
              <span class="text-color1">{` ${this.options.filter(e => e.value).length}`}</span>
            </>
          )
        }}
      />
    )
  }
})

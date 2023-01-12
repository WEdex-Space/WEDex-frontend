import { defineComponent, PropType, ref, watch, computed, inject } from 'vue'
import {
  default as MultiSelector,
  MultiSelectorOptionType,
  MultiSelectorValueType
} from '@/components/MultiSelector'
import Overlap from '@/components/Overlap'
import { DataListParamsKey } from '@/pages/index'
import { services } from '@/services'
import type { ApiDocuments } from '@/services/a2s.namespace'

export default defineComponent({
  name: 'DexSelector',
  props: {
    value: {
      type: Array as PropType<MultiSelectorValueType[]>
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const list = ref<ApiDocuments.proto_DEXResponse[]>([])
    const queryParam = ref({
      ad: !DataListParams?.chainIds?.length,
      chainIds: DataListParams?.chainIds || []
    })
    const loading = ref(false)
    const getDexList = async () => {
      if (!loading.value) {
        loading.value = true
        const { error, data } = await services['DEX@get-dex-list'](queryParam.value)
        if (!error) {
          list.value = data?.list || []
        } else {
          list.value = []
        }
        loading.value = false
      }
    }

    // init
    getDexList()
    // listener
    watch(
      () => DataListParams,
      () => {
        if (DataListParams) {
          console.log('watch DataListParams', queryParam.value.chainIds, DataListParams.chainIds)
          if (queryParam.value.chainIds.join(',') !== DataListParams.chainIds?.join(',')) {
            queryParam.value = {
              ad: !DataListParams?.chainIds?.length,
              chainIds: DataListParams?.chainIds || []
            }
            getDexList()
          }
        }
      },
      {
        deep: true
      }
    )

    const options = computed(() => [
      {
        label: 'All DEXes',
        value: undefined
      },
      ...list.value.map(item => {
        return {
          label: item.name as string,
          value: item.id,
          icon: item.logo
        }
      })
    ])

    const handleChange = (params: any) => {
      ctx.emit('change', params)
    }

    return {
      queryParam,
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

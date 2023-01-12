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
  name: 'DexBlockSelector',
  props: {
    value: {
      type: Array as PropType<MultiSelectorValueType[]>
    },
    showLength: {
      type: Number,
      default: 6
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
      ...list.value.map(item => {
        return {
          label: item.name as string,
          value: item.id,
          icon: item.logo
        }
      })
    ])

    const handleChange = (params: any[]) => {
      ctx.emit('change', params)
    }

    const valueObjs = computed(
      () =>
        props.value
          ?.map(key => {
            const targetIndex = options.value.findIndex(item => item.value === key)
            if (targetIndex !== -1) {
              return options.value[targetIndex]
            } else {
              return null
            }
          })
          .filter(e => e && e.label) || []
    )

    const defaultShowItems = computed(() => options.value.slice(0, props.showLength))
    const moreShowItems = computed(() => [
      {
        label: 'All DEXes',
        value: undefined
      },
      ...options.value.slice(props.showLength)
    ])

    const handleDefaultItemClick = (item: any) => {
      if (item.value) {
        const targetIndex = (props.value || []).indexOf(item.value)
        if (targetIndex === -1) {
          handleChange([...(props.value || []), item.value])
        } else {
          const result = [...(props.value || [])]
          result.splice(targetIndex, 1)
          handleChange(result)
        }
      } else {
        handleChange([])
      }
    }

    return {
      queryParam,
      options,
      handleChange,
      valueObjs,
      defaultShowItems,
      moreShowItems,
      handleDefaultItemClick
    }
  },
  render() {
    const itemsClass = `cursor-pointer flex h-6 px-2 items-center hover:text-color1 rounded-sm`
    const itemsHoverClass = `bg-bg3 text-color1`

    return (
      <div class="flex items-center">
        {this.valueObjs.length ? (
          <div
            class="flex mr-2 min-w-18 px-1 items-center"
            title={this.valueObjs.map((item: any) => item.label).join('/')}
          >
            <span class="mr-2">DEXes:</span>
            <Overlap
              nodes={this.valueObjs.map((item: any) => (
                <img src={item.icon} />
              ))}
            />
          </div>
        ) : (
          <div class={`${itemsClass} ${itemsHoverClass} mr-2`}>
            <span>All DEXes</span>
          </div>
        )}

        {/* default show items */}
        <ul class="flex flex-wrap gap-2">
          {this.defaultShowItems.map((item: any) => (
            <li
              class={`${itemsClass} ${
                item.value && this.value?.indexOf(item.value) !== -1 ? itemsHoverClass : ''
              }`}
              onClick={() => this.handleDefaultItemClick(item)}
            >
              {item.icon && (
                <span class="rounded-full h-4 mr-1 w-4 inline-block overflow-hidden">
                  <img src={item.icon} class="h-full w-full" />
                </span>
              )}
              {item.label}
            </li>
          ))}
        </ul>
        {this.moreShowItems.filter((e: any) => e.value).length ? (
          <MultiSelector
            placeholder="DEXes"
            value={this.value}
            options={this.moreShowItems}
            onChange={this.handleChange}
            customRender={(
              values: MultiSelectorValueType[],
              valueObjs: MultiSelectorOptionType[]
            ) => 'More'}
            v-slots={{
              total: () => (
                <>
                  DEXes:{' '}
                  <span class="text-color1">{` ${this.options.filter(e => e.value).length}`}</span>
                </>
              )
            }}
          />
        ) : null}
      </div>
    )
  }
})

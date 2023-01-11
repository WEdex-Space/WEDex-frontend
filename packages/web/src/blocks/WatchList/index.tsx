import { USpin } from '@wedex/components'
import { ExpandOutlined, ReduceRightOutlined, SettingOutlined } from '@wedex/icons'
import { defineComponent, inject, Ref, computed, ref, watch } from 'vue'
import Empty from './components/Empty'
import ListBar from './components/ListBar'
import ListEdit from './components/ListEdit'
import SyncLink from '@/components/SyncLink'
import { default as TradingDataList, TradingDataItem } from '@/components/TradingDataList'
import { useCustomDataSync } from '@/hooks'
import { DataListParamsKey, DataListParamsType } from '@/pages/index'
import { services } from '@/services'
import type { ApiDocuments } from '@/services/a2s.namespace'
import { useSocketStore } from '@/stores'
import { updatePairListWithSocketData } from '@/utils/trading'

export type watchListItem = {
  id?: number
  index: number
  title: string
  list?: {
    pairId: string
  }[]
}

export const WatchListFunctionKey = 'watchlist-data'

export default defineComponent({
  name: 'WatchList',
  setup() {
    const CustomData = useCustomDataSync(WatchListFunctionKey)
    const SocketStore = useSocketStore()
    const DataListParams = inject<DataListParamsType>(DataListParamsKey)
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const isExpand = computed(() => currentExpand?.value === 'right')

    const userLinkState = ref(false)

    const watchTable: Ref<watchListItem[] | undefined> = CustomData.list

    watch(
      () => watchTable.value,
      list => {
        console.log('watchTable', list)
        if (Array.isArray(list) && !list.length) {
          CustomData.add({
            title: 'Mainlist',
            index: 0,
            list: []
          })
        }
      },
      {
        immediate: true
      }
    )

    const currentListIndex = ref<number>(0)

    const watchItems = computed(() => {
      return watchTable.value
        ? watchTable.value[currentListIndex.value]?.list?.filter(e => !!e.pairId)
        : []
    })

    const editListMode = ref(false)

    const pairDataList = ref<TradingDataItem[]>([])

    const fetchPairData = async function () {
      if (!watchItems.value || !watchItems.value.length) {
        pairDataList.value = []
      } else {
        const { error, data } = await services['Pair@get-pair-list']({
          pairIds: watchItems.value?.map(e => e.pairId),
          size: 999
        })
        if (!error) {
          pairDataList.value = Array.isArray(data.list)
            ? updatePairListWithSocketData(
                data.list.map((item: ApiDocuments.proto_PairBasicResponse, index: number) => {
                  const dexSort: any[] = [item.tokenW0Info, item.tokenW1Info]
                  const pairs = [item.tokenW0 || '', item.tokenW1 || ''].map(
                    (contractAddress: string) => {
                      const targetIndex = dexSort.findIndex(
                        item => item.contractAddress === contractAddress
                      )
                      return targetIndex !== -1 ? dexSort[targetIndex] : {}
                    }
                  )
                  return {
                    pairReportIM: item.pairReportIM,
                    dex: item.dex,
                    network: item.network,
                    id: item.id || '',
                    index,
                    tokenPair: pairs,
                    Liquidity: item.pairReportIM?.liquidity,
                    FDV: item.pairReportIM?.fdv,
                    MKTCap: item.pairReportIM?.mktCap,
                    createdAt: item.createdAt ? item.createdAt * 1000 : 0
                  }
                }),
                undefined,
                DataListParams?.timeInterval
              )
            : []
        }
      }
    }

    watch(
      () => watchItems.value,
      () => {
        fetchPairData()
      }
    )

    watch(
      () => pairDataList.value,
      (newList, prevList) => {
        // socket subscribe
        SocketStore.init().then(socket => {
          const newPairs = newList.filter(
            newItem => (prevList || []).map(e => e.id).indexOf(newItem.id) === -1
          )
          if (newPairs.length) {
            SocketStore.subscribe(
              'trade-pair',
              newPairs.map(item => item.id),
              msg => {
                console.log('subscribe trade-pair', msg)
                pairDataList.value = updatePairListWithSocketData(
                  pairDataList.value,
                  msg.data.value,
                  DataListParams?.timeInterval
                )
              },
              'watchlist'
            )
          }
          const oldPairs = (prevList || []).filter(
            oldItem => newList.map(e => e.id).indexOf(oldItem.id) === -1
          )
          if (oldPairs.length) {
            SocketStore.unsubscribe(
              'trade-pair',
              oldPairs.map(item => item.id),
              'watchlist'
            )
          }

          console.warn('watchlist: ', newPairs, oldPairs)
        })
      },
      {
        immediate: true
      }
    )

    const handleRowClick = (row: any) => {
      console.log('handleRowClick', row, currentExpand)
      currentExpand && (currentExpand.value = 'center')
    }

    return {
      userLinkState,
      isExpand,
      currentExpand,
      editListMode,
      currentListIndex,
      watchTable,
      watchItems,
      pairDataList,
      handleRowClick,
      CustomData
    }
  },
  render() {
    const handleToggle = () => {
      if (this.isExpand) {
        this.currentExpand = 'left'
      } else {
        this.currentExpand = 'right'
      }
    }

    const iconClass = 'h-5 p-0.5 w-5 hover:text-primary'

    return (
      <div class="flex flex-col h-full relative">
        <div class="cursor-pointer top-0 left-0 absolute hover:text-primary" onClick={handleToggle}>
          {this.isExpand ? (
            <ReduceRightOutlined class={iconClass} />
          ) : (
            <ExpandOutlined class={iconClass} />
          )}
        </div>
        <div class="border-color-border flex border-b-1 h-14 items-center overflow-hidden">
          <strong class="flex-1 mx-5">WatchList</strong>
          <span
            class={`cursor-pointer px-1  text-color3 leading-0 hover:text-color1 ${
              this.editListMode ? '!text-color1' : ''
            }`}
            onClick={() => (this.editListMode = !this.editListMode)}
          >
            <SettingOutlined class="h-4 w-4" />
          </span>
        </div>

        {/* list */}
        {}
        {this.editListMode ? (
          <USpin show={this.CustomData.loading.value}>
            <ListEdit
              list={this.watchTable}
              onCreate={item => this.CustomData.add(item)}
              onEdit={item => this.CustomData.update(item)}
              onDelete={item => this.CustomData.remove(item)}
              onSort={data => this.CustomData.sortItms(data)}
              onCancel={() => (this.editListMode = false)}
            />
          </USpin>
        ) : (
          <div class="flex-1 overflow-y-auto">
            <ListBar
              current={this.currentListIndex}
              list={this.watchTable}
              onIndexChange={value => (this.currentListIndex = value)}
              onCreateList={item => this.CustomData.add(item)}
            />
            {this.pairDataList.length ? (
              <TradingDataList
                mode="watchlist"
                tableProps={{
                  flexHeight: false
                }}
                isStretch={this.currentExpand === 'right'}
                dataList={this.pairDataList}
                onRowClick={row => {
                  this.handleRowClick(row)
                }}
              />
            ) : (
              <Empty />
            )}
            <SyncLink onLinkState={value => (this.userLinkState = value)} />
          </div>
        )}
      </div>
    )
  }
})

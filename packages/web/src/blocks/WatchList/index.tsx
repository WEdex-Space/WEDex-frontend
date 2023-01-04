import { ExpandOutlined, ReduceRightOutlined, SettingOutlined } from '@wedex/icons'
import { defineComponent, inject, Ref, computed, ref, onMounted } from 'vue'
import Empty from './components/Empty'
import ListBar from './components/ListBar'
import ListEdit from './components/ListEdit'
import SyncLink from '@/components/SyncLink'
import { default as TradingDataList, TradingDataItem } from '@/components/TradingDataList'

export type watchListType = {
  name: string
  value: string
}

export default defineComponent({
  name: 'WatchList',
  setup() {
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const isExpand = computed(() => currentExpand?.value === 'right')

    const editListMode = ref(false)

    const dataList = ref<TradingDataItem[]>([])

    const fetchData = function () {
      const data = new Array(10).fill({}).map((item, index) => {
        return {
          id: item._id,
          index,
          token: [],
          views: item.views,
          createdAt: item.createdAt
        }
      })
      dataList.value = data
      // test
      // setTimeout(fetchData, 5000 * Math.random())
    }

    onMounted(() => {
      fetchData()
    })

    const handleRowClick = (row: any) => {
      console.log('handleRowClick', row, currentExpand)
      currentExpand && (currentExpand.value = 'center')
    }

    const watchLists = ref<watchListType[]>([
      {
        name: 'Mainlist',
        value: '0'
      },
      {
        name: 'list 1',
        value: '1'
      },
      {
        name: 'list 2',
        value: '2'
      }
    ])

    return {
      isExpand,
      currentExpand,
      editListMode,
      dataList,
      handleRowClick,
      watchLists
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
          <ListEdit list={this.watchLists} onCancel={() => (this.editListMode = false)} />
        ) : (
          <div class="flex-1 overflow-y-auto">
            <ListBar list={this.watchLists} onChange={value => null} />
            {this.dataList.length ? (
              <TradingDataList
                mode="watchlist"
                tableProps={{
                  flexHeight: false
                }}
                isStretch={this.currentExpand === 'right'}
                dataList={this.dataList}
                onRowClick={row => {
                  this.handleRowClick(row)
                }}
              />
            ) : (
              <Empty />
            )}
            <SyncLink />
          </div>
        )}
      </div>
    )
  }
})

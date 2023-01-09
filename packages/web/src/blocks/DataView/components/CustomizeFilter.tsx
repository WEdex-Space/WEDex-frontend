import { UPopover, UForm, UFormItem, UButton, UInputNumber, USelect } from '@wedex/components'
import { defineComponent, ref, inject, watch } from 'vue'
import CustomizeTimeRadio from './CustomizeTimeRadio'
import { setChannelFilter } from '@/blocks/DataView/MainHeader'
import { NetworkSelector, DexSelector } from '@/components/MultiSelector'
// eslint-disable-next-line import/order
import { DataListParamsKey, DataListParamsKeys, DataListParamsType } from '@/pages/index'
import './CustomizeFilter.css'
import { useGlobalConfigStore } from '@/stores'
import {
  formatCurrency,
  parseCurrency,
  parseCurrencyWithUnit,
  formatCurrencyWithUnit
} from '@/utils/numberFormat'

export default defineComponent({
  name: 'CustomizeFilter',
  emits: ['change'],
  setup(props, ctx) {
    const globalConfigStore = useGlobalConfigStore()
    const DataListParams = inject(DataListParamsKey)
    const isVisible = ref(false)
    const tipRef = ref()
    const TxnsType = ref<'total' | 'buy' | 'sell'>('total')

    const localFormData = ref<DataListParamsType>({ ...(DataListParams || {}) })

    const rankTypeOptions = ref([
      {
        label: 'Descending',
        value: 1
      },
      {
        label: 'Ascending',
        value: -1
      }
    ])

    const closeSelfModal = () => {
      tipRef.value && tipRef.value.setShow?.(false)
      isVisible.value = false
    }

    const handleSave = () => {
      DataListParams &&
        Object.keys(localFormData.value).map(key => {
          DataListParams[key as DataListParamsKeys] = localFormData.value[
            key as DataListParamsKeys
          ] as any
        })

      closeSelfModal()
    }

    watch(
      () => isVisible.value,
      () => {
        if (isVisible.value) {
          localFormData.value = {
            ...(DataListParams || {})
          }
        }
      }
    )

    const TxnsTypeOptions = [
      {
        label: 'All types',
        value: 'total'
      },
      {
        label: 'Buy',
        value: 'buy'
      },
      {
        label: 'Sell',
        value: 'sell'
      }
    ]

    const getTxnsKeyByTxnsType = (type: string, suffix?: string) => {
      let key = ''
      switch (type) {
        case 'total':
          key = 'txns'
          break
        case 'buy':
          key = 'txnsBuys'
          break
        case 'sell':
          key = 'txnsSells'
          break
        default:
      }
      return (key + suffix) as DataListParamsKeys
    }

    // when change TxnsType, update the txns[max/min] input key
    watch(
      () => TxnsType.value,
      () => {
        const historyMax =
          localFormData.value.txnsMax ||
          localFormData.value.txnsBuysMax ||
          localFormData.value.txnsSellsMax ||
          0
        const historyMin =
          localFormData.value.txnsMin ||
          localFormData.value.txnsBuysMin ||
          localFormData.value.txnsSellsMin ||
          0

        if (historyMax) {
          const updateParam: any = {}
          updateParam[getTxnsKeyByTxnsType(TxnsType.value, 'Max')] = historyMax

          Object.assign(
            localFormData.value,
            {
              txnsMax: undefined,
              txnsBuysMax: undefined,
              txnsSellsMax: undefined
            },
            updateParam
          )
        }

        if (historyMin) {
          const updateParam: any = {}
          updateParam[getTxnsKeyByTxnsType(TxnsType.value, 'Min')] = historyMin
          Object.assign(
            localFormData.value,
            {
              txnsMin: undefined,
              txnsBuysMin: undefined,
              txnsSellsMin: undefined
            },
            updateParam
          )
        }
      }
    )

    return {
      globalConfigStore,
      TxnsType,
      rankTypeOptions,
      isVisible,
      localFormData,
      tipRef,
      TxnsTypeOptions,
      getTxnsKeyByTxnsType,
      handleSave,
      closeSelfModal
    }
  },
  render() {
    const setParamValue = (key: DataListParamsKeys, value: any) => {
      this.localFormData[key] = value
    }

    const updateTimeRealy = () => {
      if (this.localFormData.channelType && this.localFormData.timeInterval) {
        Object.assign(
          this.localFormData,
          setChannelFilter(this.localFormData.channelType, this.localFormData.timeInterval)
        )
      }
    }

    return (
      <UPopover
        ref={ref => (this.tipRef = ref)}
        display-directive="show"
        trigger="click"
        placement="top"
        raw={true}
        arrowStyle={{ background: this.globalConfigStore.theme === 'dark' ? '#2C3138' : '#F5F5F5' }}
        on-update:show={(value: boolean) => (this.isVisible = value)}
        v-slots={{
          trigger: () => (this.$slots.default ? this.$slots.default(this.isVisible) : 'Customize'),
          default: () => (
            <div class="border border-color-border rounded bg-bg2 text-xs min-h-30 p-5 text-color3 w-100">
              <UForm size="small" label-placement="left" label-width="auto" class="CustomizeFilter">
                <UFormItem label="Networks">
                  <NetworkSelector
                    value={this.localFormData.chainIds}
                    onChange={value => setParamValue('chainIds', value)}
                  />
                </UFormItem>
                <UFormItem label="DEXes">
                  <DexSelector
                    value={this.localFormData.dexs}
                    onChange={value => setParamValue('dexs', value)}
                  />
                </UFormItem>
                <UFormItem label="Time">
                  <CustomizeTimeRadio
                    value={this.localFormData.timeInterval}
                    onChange={value => {
                      setParamValue('timeInterval', value)
                      updateTimeRealy()
                    }}
                  />
                </UFormItem>
                <UFormItem label="Txns">
                  <div class="w-full">
                    <div class="flex mb-2 gap-2">
                      <USelect
                        value={this.TxnsType}
                        class="flex-1"
                        options={this.TxnsTypeOptions}
                        onUpdate:value={value => (this.TxnsType = value)}
                      />
                      <div class="flex-1"></div>
                    </div>
                    <div class="flex gap-2">
                      <UInputNumber
                        precision={0}
                        class="flex-1"
                        value={
                          (this.localFormData[
                            this.getTxnsKeyByTxnsType(this.TxnsType, 'Min')
                          ] as number) || 0
                        }
                        min={0}
                        parse={parseCurrency}
                        format={formatCurrency}
                        v-slots={{
                          prefix: () => 'Min'
                        }}
                        onUpdate:value={value =>
                          setParamValue(`${this.getTxnsKeyByTxnsType(this.TxnsType, 'Min')}`, value)
                        }
                      />
                      <UInputNumber
                        precision={0}
                        class="flex-1"
                        value={
                          (this.localFormData[
                            this.getTxnsKeyByTxnsType(this.TxnsType, 'Max')
                          ] as number) || 0
                        }
                        min={0}
                        parse={parseCurrency}
                        format={formatCurrency}
                        v-slots={{
                          prefix: () => 'Max'
                        }}
                        onUpdate:value={value =>
                          setParamValue(`${this.getTxnsKeyByTxnsType(this.TxnsType, 'Max')}`, value)
                        }
                      />
                    </div>
                  </div>
                </UFormItem>
                <UFormItem label="Liquidity">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      precision={2}
                      class="flex-1"
                      value={this.localFormData.liquidityMin || 0}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Min'
                      }}
                      onUpdate:value={value => setParamValue('liquidityMin', value)}
                    />
                    <UInputNumber
                      precision={2}
                      class="flex-1"
                      value={this.localFormData.liquidityMax || 0}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Max'
                      }}
                      onUpdate:value={value => setParamValue('liquidityMax', value)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Volume">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      precision={2}
                      class="flex-1"
                      value={this.localFormData.volumeMin || 0}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Min'
                      }}
                      onUpdate:value={value => setParamValue('volumeMin', value)}
                    />
                    <UInputNumber
                      precision={2}
                      class="flex-1"
                      value={this.localFormData.volumeMax || 0}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Max'
                      }}
                      onUpdate:value={value => setParamValue('volumeMax', value)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Change">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      precision={2}
                      class="flex-1"
                      value={this.localFormData.priceChangeMin || 0}
                      v-slots={{
                        prefix: () => 'Min',
                        suffix: () => '%'
                      }}
                      onUpdate:value={value => setParamValue('priceChangeMin', value)}
                    />
                    <UInputNumber
                      precision={2}
                      class="flex-1"
                      value={this.localFormData.priceChangeMax || 0}
                      v-slots={{
                        prefix: () => 'Max',
                        suffix: () => '%'
                      }}
                      onUpdate:value={value => setParamValue('priceChangeMax', value)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Pair age">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      precision={0}
                      class="flex-1"
                      value={this.localFormData.pairAgeMin || 0}
                      min={0}
                      v-slots={{
                        prefix: () => 'Min',
                        suffix: () => 'H'
                      }}
                      onUpdate:value={value => setParamValue('pairAgeMin', value)}
                    />
                    <UInputNumber
                      precision={0}
                      class="flex-1"
                      value={this.localFormData.pairAgeMax || 0}
                      min={0}
                      v-slots={{
                        prefix: () => 'Max',
                        suffix: () => 'H'
                      }}
                      onUpdate:value={value => setParamValue('pairAgeMax', value)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Rank by">
                  <div class="flex w-full gap-2">
                    <USelect
                      value={this.localFormData.rankType}
                      class="flex-1"
                      options={this.rankTypeOptions}
                      onUpdate:value={value => setParamValue('rankType', value)}
                    />
                    <div class="flex-1"></div>
                  </div>
                </UFormItem>
              </UForm>
              <div class="flex gap-2 justify-end">
                <UButton
                  type="primary"
                  ghost
                  size="small"
                  class="px-5 hover:opacity-80"
                  onClick={() => this.closeSelfModal()}
                >
                  Cancel
                </UButton>
                <UButton
                  type="primary"
                  size="small"
                  class="text-white px-5 hover:opacity-80"
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

import { UPopover, UForm, UFormItem, UButton, UInputNumber, USelect } from '@wedex/components'
import { defineComponent, ref, inject } from 'vue'
// eslint-disable-next-line import/order
import { DataListParamsKey, DataListParamsKeys } from '@/pages/index'
import './CustomizeFilter.css'
import CustomizeTimeRadio from './CustomizeTimeRadio'
import { NetworkSelector, DexSelector } from '@/components/MultiSelector'
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
    const SortOrderType = ref<'Descending' | 'Descending'>('Descending')

    const closeSelfModal = () => {
      tipRef.value && tipRef.value.setShow?.(false)
      isVisible.value = false
    }

    const handleSave = () => {
      console.log('handleSave')
      closeSelfModal()
    }

    return {
      globalConfigStore,
      TxnsType,
      SortOrderType,
      isVisible,
      DataListParams,
      tipRef,
      handleSave,
      closeSelfModal
    }
  },
  render() {
    const setParamValue = (key: DataListParamsKeys, value: any) => {
      this.DataListParams && (this.DataListParams[key] = value)
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
                    value={this.DataListParams?.chainIds}
                    onChange={value => setParamValue('chainIds', value)}
                  />
                </UFormItem>
                <UFormItem label="DEXes">
                  <DexSelector
                    value={this.DataListParams?.dexs}
                    chainIds={this.DataListParams?.chainIds}
                    onChange={value => setParamValue('dexs', value)}
                  />
                </UFormItem>
                <UFormItem label="Time">
                  <CustomizeTimeRadio
                    value={this.DataListParams?.timeInterval}
                    onChange={value => setParamValue('timeInterval', value)}
                  />
                </UFormItem>
                <UFormItem label="Txns">
                  <div class="w-full">
                    <div class="flex mb-2 gap-2">
                      <USelect
                        value={this.TxnsType}
                        class="flex-1"
                        options={[
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
                        ]}
                        onUpdate:value={value => (this.TxnsType = value)}
                      />
                      <div class="flex-1"></div>
                    </div>
                    <div class="flex gap-2">
                      <UInputNumber
                        class="flex-1"
                        value={this.DataListParams?.txnsMin || 0}
                        min={0}
                        parse={parseCurrency}
                        format={formatCurrency}
                        v-slots={{
                          prefix: () => 'Min'
                        }}
                        onUpdate:value={value => setParamValue('txnsMin', value)}
                      />
                      <UInputNumber
                        class="flex-1"
                        value={this.DataListParams?.txnsMax || 0}
                        min={0}
                        parse={parseCurrency}
                        format={formatCurrency}
                        v-slots={{
                          prefix: () => 'Max'
                        }}
                        onUpdate:value={value => setParamValue('txnsMax', value)}
                      />
                    </div>
                  </div>
                </UFormItem>
                <UFormItem label="Liquidity">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      class="flex-1"
                      value={this.DataListParams?.liquidityMin || 0}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Min'
                      }}
                      onUpdate:value={value => setParamValue('liquidityMin', value)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.DataListParams?.liquidityMax || 0}
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
                      class="flex-1"
                      value={this.DataListParams?.volumeMin || 0}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Min'
                      }}
                      onUpdate:value={value => setParamValue('volumeMin', value)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.DataListParams?.volumeMax || 0}
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
                      class="flex-1"
                      value={this.DataListParams?.trendMin || 0}
                      min={0}
                      max={100}
                      v-slots={{
                        prefix: () => 'Min',
                        suffix: () => '%'
                      }}
                      onUpdate:value={value => setParamValue('trendMin', value)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.DataListParams?.trendMax || 0}
                      min={0}
                      max={100}
                      v-slots={{
                        prefix: () => 'Max',
                        suffix: () => '%'
                      }}
                      onUpdate:value={value => setParamValue('trendMax', value)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Pair age">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      class="flex-1"
                      value={this.DataListParams?.pairAgeMin || 0}
                      min={0}
                      v-slots={{
                        prefix: () => 'Min',
                        suffix: () => 'H'
                      }}
                      onUpdate:value={value => setParamValue('pairAgeMin', value)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.DataListParams?.pairAgeMax || 0}
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
                      value={this.SortOrderType}
                      class="flex-1"
                      options={[
                        {
                          label: 'Descending',
                          value: 'Descending'
                        },
                        {
                          label: 'Ascending',
                          value: 'Ascending'
                        }
                      ]}
                      onUpdate:value={value => (this.SortOrderType = value)}
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

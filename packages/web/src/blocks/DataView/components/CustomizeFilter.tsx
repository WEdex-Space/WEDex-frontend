import { UPopover, UForm, UFormItem, UButton, UInputNumber, USelect } from '@wedex/components'
import { defineComponent, ref, inject, onMounted } from 'vue'
// eslint-disable-next-line import/order
import { DataListParamsKey } from '@/pages/index'
import './CustomizeFilter.css'
import CustomizeTimeRadio from './CustomizeTimeRadio'
import { NetworkSelector, DexSelector } from '@/components/MultiSelector'
import { allNetworks } from '@/constants'
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
    const networksOptions = ref<any[]>([])
    const isVisible = ref(false)
    const tipRef = ref()
    const formData = ref<{
      FilterTime: string | null
      TxnsType: string
      TxnsMin: number
      TxnsMax: number
      LiquidityMin: number
      LiquidityMax: number
      VolumnMin: number
      VolumnMax: number
      ChangeMin: number
      ChangeMax: number
      AgeMin: number
      AgeMax: number
      SortType: 'Descending' | 'Ascending'
    }>({
      FilterTime: null,
      TxnsType: '',
      TxnsMin: 0,
      TxnsMax: 0,
      LiquidityMin: 0,
      LiquidityMax: 0,
      VolumnMin: 0,
      VolumnMax: 0,
      ChangeMin: 0,
      ChangeMax: 0,
      AgeMin: 0,
      AgeMax: 0,
      SortType: 'Descending'
    })

    const closeSelfModal = () => {
      tipRef.value && tipRef.value.setShow?.(false)
      isVisible.value = false
    }

    const handleSave = () => {
      console.log('handleSave')
      closeSelfModal()
    }

    const handleVisibleUpdate = (show: boolean) => {
      isVisible.value = show
      console.log('show', show)
    }

    onMounted(() => {
      // get networks
      networksOptions.value = [
        {
          label: 'All Networks',
          value: null
        },
        ...allNetworks
          .filter(item => !!item.shortName)
          .map(item => {
            return {
              label: item.shortName as string,
              value: item.chainId,
              icon: item.logo
            }
          })
      ]
    })

    return {
      globalConfigStore,
      formData,
      networksOptions,
      isVisible,
      DataListParams,
      tipRef,
      handleSave,
      handleVisibleUpdate,
      closeSelfModal
    }
  },
  render() {
    return (
      <UPopover
        ref={ref => (this.tipRef = ref)}
        display-directive="show"
        trigger="click"
        placement="top"
        raw={true}
        arrowStyle={{ background: this.globalConfigStore.theme === 'dark' ? '#2C3138' : '#F5F5F5' }}
        on-update:show={this.handleVisibleUpdate}
        v-slots={{
          trigger: () => (this.$slots.default ? this.$slots.default(this.isVisible) : 'Customize'),
          default: () => (
            <div class="border border-color-border rounded bg-bg2 text-xs min-h-30 p-5 text-color3 w-100">
              <UForm size="small" label-placement="left" label-width="auto" class="CustomizeFilter">
                <UFormItem label="Networks">
                  <NetworkSelector
                    value={this.DataListParams?.chainId}
                    options={this.networksOptions}
                    onChange={value => this.DataListParams && (this.DataListParams.chainId = value)}
                  />
                </UFormItem>
                <UFormItem label="DEXes">
                  <DexSelector
                    value={this.DataListParams?.DEXe}
                    options={this.networksOptions}
                    onChange={value => this.DataListParams && (this.DataListParams.DEXe = value)}
                  />
                </UFormItem>
                <UFormItem label="Time">
                  <CustomizeTimeRadio
                    value={this.formData.FilterTime}
                    onChange={value => (this.formData.FilterTime = value)}
                  />
                </UFormItem>
                <UFormItem label="Txns">
                  <div class="w-full">
                    <div class="flex mb-2 gap-2">
                      <USelect
                        value={this.formData.TxnsType}
                        class="flex-1"
                        options={[
                          {
                            label: 'All types',
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
                        ]}
                        onUpdate:value={value => (this.formData.TxnsType = value)}
                      />
                      <div class="flex-1"></div>
                    </div>
                    <div class="flex gap-2">
                      <UInputNumber
                        class="flex-1"
                        value={this.formData.TxnsMin}
                        min={0}
                        parse={parseCurrency}
                        format={formatCurrency}
                        v-slots={{
                          prefix: () => 'Min'
                        }}
                        onUpdate:value={value => (this.formData.TxnsMin = value || 0)}
                      />
                      <UInputNumber
                        class="flex-1"
                        value={this.formData.TxnsMax}
                        min={0}
                        parse={parseCurrency}
                        format={formatCurrency}
                        v-slots={{
                          prefix: () => 'Max'
                        }}
                        onUpdate:value={value => (this.formData.TxnsMax = value || 0)}
                      />
                    </div>
                  </div>
                </UFormItem>
                <UFormItem label="Liquidity">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.LiquidityMin}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Min'
                      }}
                      onUpdate:value={value => (this.formData.LiquidityMin = value || 0)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.LiquidityMax}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Max'
                      }}
                      onUpdate:value={value => (this.formData.LiquidityMax = value || 0)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Volume">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.VolumnMin}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Min'
                      }}
                      onUpdate:value={value => (this.formData.VolumnMin = value || 0)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.VolumnMax}
                      min={0}
                      parse={parseCurrencyWithUnit}
                      format={formatCurrencyWithUnit}
                      v-slots={{
                        prefix: () => 'Max'
                      }}
                      onUpdate:value={value => (this.formData.VolumnMax = value || 0)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Change">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.ChangeMin}
                      min={0}
                      max={100}
                      v-slots={{
                        prefix: () => 'Min',
                        suffix: () => '%'
                      }}
                      onUpdate:value={value => (this.formData.ChangeMin = value || 0)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.ChangeMax}
                      min={0}
                      max={100}
                      v-slots={{
                        prefix: () => 'Max',
                        suffix: () => '%'
                      }}
                      onUpdate:value={value => (this.formData.ChangeMax = value || 0)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Pair age">
                  <div class="flex w-full gap-2">
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.AgeMin}
                      min={0}
                      v-slots={{
                        prefix: () => 'Min',
                        suffix: () => 'H'
                      }}
                      onUpdate:value={value => (this.formData.AgeMin = value || 0)}
                    />
                    <UInputNumber
                      class="flex-1"
                      value={this.formData.AgeMax}
                      min={0}
                      v-slots={{
                        prefix: () => 'Max',
                        suffix: () => 'H'
                      }}
                      onUpdate:value={value => (this.formData.AgeMax = value || 0)}
                    />
                  </div>
                </UFormItem>
                <UFormItem label="Rank by">
                  <div class="flex w-full gap-2">
                    <USelect
                      value={this.formData.SortType}
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
                      onUpdate:value={value => (this.formData.SortType = value)}
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

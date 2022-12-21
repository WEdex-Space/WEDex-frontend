import type { UContractInteractionPropsType, UContractInteractionStatus } from '@WEDex/components'

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { DeepWriteable } from '@/utils/valid'
export type TransacationType = {
  hash: string
  text: string
  status: 'pending' | 'success' | 'failed'
}

export type ContractState = {
  // current status
  contract: DeepWriteable<NonNullable<UContractInteractionPropsType>>
  // pending contract transacations
  transacations: TransacationType[]
}
export type optionsType = {
  chain_id: number
  switch: boolean
  name: string
  type: number
  mission: string
  overview: string
  tags: Array<string>
  txHash?: string
}
export type optionsSettingType = optionsType & {
  startup_id: string
  logo: string
  banner: string
}
export const useContractStore = defineStore('contract', {
  state: (): ContractState => ({
    contract: {
      status: undefined,
      text: ''
    },
    transacations: []
  }),
  actions: {
    startContract(text: string) {
      this.contract.status = 'pending'
      this.contract.text = text
    },
    async endContract(
      status: Omit<UContractInteractionStatus, 'pending'>,
      ret:
        | {
            success: false
          }
        | { success: true; hash: string; text: string; promiseFn: () => Promise<any> }
    ) {
      this.contract.status = status as UContractInteractionStatus
      if (ret.success) {
        const transaction: ContractState['transacations'][number] = reactive({
          hash: ret.hash,
          text: ret.text,
          status: 'pending'
        })
        this.transacations.push(transaction)
        try {
          await ret.promiseFn()
          console.log(`tx ${ret.hash} success`)
          transaction.status = 'success'
          return true
        } catch (error) {
          transaction.status = 'failed'
          return false
        }
      }
      return false
    },
    closeTransaction(transaction: TransacationType) {
      const index = this.transacations.indexOf(transaction)
      if (index > -1) {
        this.transacations.splice(index, 1)
      }
    }
  }
})

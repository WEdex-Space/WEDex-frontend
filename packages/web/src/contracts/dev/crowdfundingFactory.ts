import { Contract, BigNumber } from 'ethers'
import { computed } from 'vue'
import { getContract, GetContractArgs, wrapTransaction } from '../share'
import { useWalletStore } from '@/stores'

export const CrowdfundingFactoryAddresses: Record<number, string> = {
  5: '0xc729D91818dbf102885cEf38B9aeDc0F2f70fAb1',
  43113: '0xf8874878065d8E371208bdA2408c689430f2645D',
  97: '0x357fa1565B94D9F7C770D30c95a405F805d95fEA',
  4002: '0x1813E37D76316eCE03D3f7a9D908052D061355Fb',
  80001: '0x7A9a466DE08747bC8Ad79aBA6D8dCE9D64E5C767',
  2814: '0x914B75c95f3c1A090A2F255be95Bdb2B10CBD770'
}

const abi =
  '[{"inputs":[],"name":"children","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sellToken","type":"address"},{"internalType":"address","name":"_buyToken","type":"address"},{"internalType":"uint256","name":"_raiseTotal","type":"uint256"},{"internalType":"uint256","name":"_buyPrice","type":"uint256"},{"internalType":"uint16","name":"_swapPercent","type":"uint16"},{"internalType":"uint16","name":"_sellTax","type":"uint16"},{"internalType":"uint256","name":"_maxBuyAmount","type":"uint256"},{"internalType":"uint16","name":"_maxSellPercent","type":"uint16"},{"internalType":"address","name":"_teamWallet","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"}],"name":"createCrowdfundingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getStore","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isChild","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFactory","type":"address"}],"name":"transferPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStore","type":"address"}],"name":"transferStore","outputs":[],"stateMutability":"nonpayable","type":"function"}]'

export function useCrowdfundingFactoryContract(
  params: Omit<GetContractArgs, 'abi'> = { addresses: CrowdfundingFactoryAddresses }
): {
  getContract: () => Contract
  children: (pendingText: string, waitingText: string, overrides?: any) => Promise<[/**  */ any]>
  createCrowdfundingContract: (
    _sellToken: string,
    _buyToken: string,
    _raiseTotal: number | BigNumber,
    _buyPrice: number | BigNumber,
    _swapPercent: any,
    _sellTax: any,
    _maxBuyAmount: number | BigNumber,
    _maxSellPercent: any,
    _teamWallet: string,
    _startTime: number | BigNumber,
    _endTime: number | BigNumber,
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[]>
  getStore: (pendingText: string, waitingText: string, overrides?: any) => Promise<[/**  */ string]>
  isChild: (
    _address: string,
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[/**  */ any]>
  owner: (pendingText: string, waitingText: string, overrides?: any) => Promise<[/**  */ string]>
  renounceOwnership: (pendingText: string, waitingText: string, overrides?: any) => Promise<[]>
  transferOwnership: (
    newOwner: string,
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[]>
  transferPrimary: (
    newFactory: string,
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[]>
  transferStore: (
    newStore: string,
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[]>
} {
  const walletStore = useWalletStore()
  const getContractArgs = computed<GetContractArgs>(() => {
    return {
      abi,
      addresses: CrowdfundingFactoryAddresses,
      wallet: walletStore.wallet,
      chainId: walletStore.chainId
    }
  })
  return {
    getContract: () => getContract({ ...getContractArgs.value, ...params }),
    children: wrapTransaction({ ...getContractArgs.value, ...params }, 'children'),
    createCrowdfundingContract: wrapTransaction(
      { ...getContractArgs.value, ...params },
      'createCrowdfundingContract'
    ),
    getStore: wrapTransaction({ ...getContractArgs.value, ...params }, 'getStore'),
    isChild: wrapTransaction({ ...getContractArgs.value, ...params }, 'isChild'),
    owner: wrapTransaction({ ...getContractArgs.value, ...params }, 'owner'),
    renounceOwnership: wrapTransaction(
      { ...getContractArgs.value, ...params },
      'renounceOwnership'
    ),
    transferOwnership: wrapTransaction(
      { ...getContractArgs.value, ...params },
      'transferOwnership'
    ),
    transferPrimary: wrapTransaction({ ...getContractArgs.value, ...params }, 'transferPrimary'),
    transferStore: wrapTransaction({ ...getContractArgs.value, ...params }, 'transferStore')
  }
}

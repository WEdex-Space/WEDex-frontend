import { Contract, BigNumber } from 'ethers'
import { computed } from 'vue'
import { getContract, GetContractArgs, wrapTransaction } from '../share'
import { useWalletStore } from '@/stores'

export const StartupAddresses: Record<number, string> = {
  43113: '0x92FCb2d49E9ab8be888D3c853715a221b9289832',
  137: '0x357fa1565B94D9F7C770D30c95a405F805d95fEA',
  2814: '0xF2969E322C8a2615eD81bd0B50FD1481C4c3f276'
}

const abi =
  '[{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"bool","name":"used","type":"bool"}],"internalType":"struct Startup.Profile","name":"p","type":"tuple"}],"name":"createStartup","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getStartup","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"bool","name":"used","type":"bool"}],"internalType":"struct Startup.Profile","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStore","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newPrimary","type":"address"}],"name":"transferPrimary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStore","type":"address"}],"name":"transferStore","outputs":[],"stateMutability":"nonpayable","type":"function"}]'

export function useStartupContract(
  params: Omit<GetContractArgs, 'abi'> = { addresses: StartupAddresses }
): {
  getContract: () => Contract
  createStartup: (
    p: [name: string, chainId: number | BigNumber, used: any],
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[]>
  getStartup: (
    name: string,
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[/**  */ [/** name */ string, /** chainId */ number | BigNumber, /** used */ any]]>
  getStore: (pendingText: string, waitingText: string, overrides?: any) => Promise<[/**  */ string]>
  owner: (pendingText: string, waitingText: string, overrides?: any) => Promise<[/**  */ string]>
  renounceOwnership: (pendingText: string, waitingText: string, overrides?: any) => Promise<[]>
  transferOwnership: (
    newOwner: string,
    pendingText: string,
    waitingText: string,
    overrides?: any
  ) => Promise<[]>
  transferPrimary: (
    newPrimary: string,
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
      addresses: StartupAddresses,
      wallet: walletStore.wallet,
      chainId: walletStore.chainId
    }
  })
  return {
    getContract: () => getContract({ ...getContractArgs.value, ...params }),
    createStartup: wrapTransaction({ ...getContractArgs.value, ...params }, 'createStartup'),
    getStartup: wrapTransaction({ ...getContractArgs.value, ...params }, 'getStartup'),
    getStore: wrapTransaction({ ...getContractArgs.value, ...params }, 'getStore'),
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

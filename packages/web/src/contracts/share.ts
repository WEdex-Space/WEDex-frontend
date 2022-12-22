import { message } from '@wedex/components'
import { Contract } from 'ethers'
import { useContractStore } from '@/stores/contract'
import AbstractWallet from '@/wallets/AbstractWallet'

export function wrapTransaction(
  contractArgs: GetContractArgs,
  functionName: string
): () => Promise<any> {
  const contractStore = useContractStore()
  return (...fnArgs: any[]) => {
    let waitingText = ''
    let overrides = fnArgs.pop()
    if (Object.prototype.toString.call(overrides) === '[object Object]') {
      waitingText = fnArgs.pop()
    } else {
      waitingText = overrides
      overrides = {}
    }
    const pengdingText = fnArgs.pop()
    if (pengdingText) {
      contractStore.startContract(pengdingText)
    }
    const contract = getContract(contractArgs)
    const fn = contract[functionName]
    return fn(...fnArgs, overrides)
      .then((res: any) => {
        if (waitingText) {
          contractStore.endContract('success', {
            success: true,
            hash: res.hash,
            text: waitingText,
            promiseFn: res.wait
          })
        }
        return res
      })
      .catch((e: any) => {
        if (pengdingText || waitingText) {
          contractStore.endContract('failed', { success: false })
        }
        if (e.data?.message) {
          message.error(e.data.message)
        }
        return null
      })
  }
}

export type GetContractArgs = {
  addresses: Record<number, string>
  abi: string
  wallet?: AbstractWallet
  chainId?: number
}
export function getContract(args: GetContractArgs) {
  const signer = args.wallet?.getSigner()
  if (!signer) {
    throw new Error('Wallet is not initialized')
  }
  if (!args.chainId) {
    throw new Error('No network selected')
  }
  const address = args.addresses[args.chainId]
  if (!address) {
    console.warn('Not supported network', args.addresses, args.chainId)
    throw new Error('Not supported network')
  }
  return new Contract(
    address,
    args.abi.replace(/\\t/g, '').replace(/\\r/g, '').replace(/\\n/g, '').replace(/\\"/g, '"'),
    signer
  )
}

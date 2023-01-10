/* eslint-disable */
import { requestAdapter } from './a2s.adapter'
import type { ApiDocuments } from './a2s.namespace'
import { extract, replacePath } from './a2s.utils'

export const services = {
  'Authorization@login-by-wallet-address'(args: ApiDocuments.proto_WalletLoginRequest) {
    return requestAdapter<ApiDocuments.proto_JwtAuthorizationResponse>({
      url: replacePath('/authorizations/wallet', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'Authorization@get-nonce-by-address'(args: {
    /**
     * @description wallet address
     */
    walletAddress: string
  }) {
    return requestAdapter<ApiDocuments.proto_NonceResponse>({
      url: replacePath('/authorizations/{walletAddress}/nonce', args),
      method: 'GET',
      ...extract('GET', args, [], ['walletAddress'])
    })
  },
  'Chain@get-chain-list'(args?: any) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_ChainResponse[]
      }
    >({
      url: replacePath('/chains', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  'CustomFunction@sync-custom-func-items'(
    args: {
      /**
       * @description custom-func
       */
      function: string
    } & ApiDocuments.proto_SyncListRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/customs/sync/{function}', args),
      method: 'POST',
      ...extract('POST', args, [], ['function'])
    })
  },
  'CustomFunction@get-custom-func-list'(
    args: {
      /**
       * @description custom-func
       */
      function: string
    } & {
      /**
       * @description query rank by; field, According to the data structure, splicing field strings with dots
       */
      rankBy?: string
      /**
       * @description query rank type; 1 asc, -1 desc
       */
      rankType?: number
    }
  ) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: {}[]
      }
    >({
      url: replacePath('/customs/{function}', args),
      method: 'GET',
      ...extract('GET', args, ['rankBy', 'rankType'], ['function'])
    })
  },
  'CustomFunction@create-custom-func'(
    args: {
      /**
       * @description custom-func
       */
      function: string
    } & ApiDocuments.proto_SyncItemRequest
  ) {
    return requestAdapter<ApiDocuments.proto_IDResponse>({
      url: replacePath('/customs/{function}', args),
      method: 'POST',
      ...extract('POST', args, [], ['function'])
    })
  },
  'CustomFunction@update-custom-func'(
    args: {
      /**
       * @description custom-func
       */
      function: string
      /**
       * @description custom-func item id
       */
      id: string
    } & ApiDocuments.proto_SyncItemRequest
  ) {
    return requestAdapter<ApiDocuments.proto_IDResponse>({
      url: replacePath('/customs/{function}/{id}', args),
      method: 'PUT',
      ...extract('PUT', args, [], ['function', 'id'])
    })
  },
  'CustomFunction@delete-custom-func-item'(args: {
    /**
     * @description Delete custom-func
     */
    function: string
    /**
     * @description Delete custom-func item id
     */
    id: string
  }) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/customs/{function}/{id}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['function', 'id'])
    })
  },
  'DEX@get-dex-list'(args: {
    /**
     * @description ad, advertise
     */
    ad?: boolean
    /**
     * @description chainId list
     */
    chainIds?: number[]
    /**
     * @description query keyword
     */
    keyword?: string
  }) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_DEXResponse[]
      }
    >({
      url: replacePath('/dexs', args),
      method: 'GET',
      ...extract('GET', args, ['ad', 'chainIds', 'keyword'], [])
    })
  },
  'Pair@get-pair-list'(
    args: {
      /**
       * @description pagination select current page, default: 1
       */
      page?: number
      /**
       * @description pagination size, default: 20
       */
      size?: number
    } & ApiDocuments.proto_QueryPairRequest
  ) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_PairBasicResponse[]
      }
    >({
      url: replacePath('/pairs', args),
      method: 'POST',
      ...extract('POST', args, ['page', 'size'], [])
    })
  },
  'Pair@get-pair-info'(args: {
    /**
     * @description pair id
     */
    pairId: string
  }) {
    return requestAdapter<ApiDocuments.proto_PairResponse>({
      url: replacePath('/pairs/{pairId}', args),
      method: 'GET',
      ...extract('GET', args, [], ['pairId'])
    })
  },
  'Pair@get-kline-list'(
    args: {
      /**
       * @description pair id
       */
      pairId: string
      /**
       * @description kline type, example: 1m\5m\1h
       */
      type: string
    } & {
      /**
       * @description pagination select current page, default: 1
       */
      page?: number
      /**
       * @description pagination size, default: 20
       */
      size?: number
    }
  ) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_PairReportResponse[]
      }
    >({
      url: replacePath('/pairs/{pairId}/kline/{type}', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['pairId', 'type'])
    })
  },
  'Pair@get-pair-transaction-list'(
    args: {
      /**
       * @description pair id
       */
      pairId: string
    } & {
      /**
       * @description pagination select current page, default: 1
       */
      page?: number
      /**
       * @description pagination size, default: 20
       */
      size?: number
    }
  ) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_PairTransactionResponse[]
      }
    >({
      url: replacePath('/pairs/{pairId}/transactions', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['pairId'])
    })
  },
  'Share@set-share'(args: ApiDocuments.proto_ShareSetRequest) {
    return requestAdapter<ApiDocuments.proto_ShareSetResponse>({
      url: replacePath('/share', args),
      method: 'PUT',
      ...extract('PUT', args, [], [])
    })
  },
  'Share@get-share-page-html'(args: {
    /**
     * @description share code
     */
    shareCode: string
  }) {
    return requestAdapter<any>({
      url: replacePath('/share/{shareCode}', args),
      method: 'GET',
      ...extract('GET', args, [], ['shareCode'])
    })
  },
  'Token@get-token-categories-list'(args?: any) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: string[]
      }
    >({
      url: replacePath('/tokens/categories', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  'Upload@upload-file'(args: {
    /**
     * @description file
     */
    file: File
  }) {
    return requestAdapter<ApiDocuments.proto_UploadResponse>({
      url: replacePath('/upload', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  }
}

export type ServiceKeys = keyof typeof services

export type ServiceArg<T extends ServiceKeys> = Parameters<typeof services[T]>[0]

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type ServiceReturn<T extends ServiceKeys> = Awaited<ReturnType<typeof services[T]>>['data']

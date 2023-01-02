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
  'Chain@get-chain-list'(args: {
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_ChainResponse[]
      }
    >({
      url: replacePath('/chains', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], [])
    })
  },
  'DEX@get-dex-list'(args: {
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_DEXResponse[]
      }
    >({
      url: replacePath('/dexs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], [])
    })
  },
  'MultiChart@get-multi-chart-tab-list'(args: {
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_MultiChartTabResponse[]
      }
    >({
      url: replacePath('/multi-chart-tabs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], [])
    })
  },
  'MultiChart@create-multi-chart-tab'(args: ApiDocuments.proto_MultiChartTabCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'MultiChart@update-multi-chart-tab'(
    args: {
      /**
       * @description tab id
       */
      tabId: string
    } & ApiDocuments.proto_MultiChartTabUpdateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs/{tabId}', args),
      method: 'PUT',
      ...extract('PUT', args, [], ['tabId'])
    })
  },
  'MultiChart@get-multi-chart-pair-list'(
    args: {
      /**
       * @description tab id
       */
      tabId: string
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
        list?: ApiDocuments.proto_MultiChartPairResponse[]
      }
    >({
      url: replacePath('/multi-chart-tabs/{tabId}/pairs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['tabId'])
    })
  },
  'MultiChart@create-multi-chart-pair'(
    args: {
      /**
       * @description multi chart tab id
       */
      tabId: string
    } & ApiDocuments.proto_MultiChartPairCreateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs/{tabId}/pairs', args),
      method: 'POST',
      ...extract('POST', args, [], ['tabId'])
    })
  },
  'MultiChart@delete-multi-chart-pair'(args: {
    /**
     * @description multi-chart-tab id
     */
    tabId: string
    /**
     * @description multi-chart-tab-pair id
     */
    pairId: string
  }) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs/{tabId}/pairs/{pairId}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['tabId', 'pairId'])
    })
  },
  'Notebook@get-notebook-list'(args: {
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_NotebookResponse[]
      }
    >({
      url: replacePath('/notebooks', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], [])
    })
  },
  'Notebook@create-notebook'(args: ApiDocuments.proto_NotebookCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notebooks', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'Notebook@update-notebook'(
    args: {
      /**
       * @description notebook id
       */
      notebookId: string
    } & ApiDocuments.proto_NotebookUpdateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notebooks/{notebookId}', args),
      method: 'PUT',
      ...extract('PUT', args, [], ['notebookId'])
    })
  },
  'Notebook@delete-notebook'(args: {
    /**
     * @description notebook id
     */
    notebookId: string
  }) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notebooks/{notebookId}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['notebookId'])
    })
  },
  'Notification@get-notification-list'(args: {
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_NotificationResponse[]
      }
    >({
      url: replacePath('/notifications', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], [])
    })
  },
  'Notification@create-notification'(args: ApiDocuments.proto_NotificationCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notifications', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'Pair@get-pair-list'(args: {
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
    /**
     * @description query keyword
     */
    keyword?: string
    orderKey?: string
    orderValue?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_PairBasicResponse[]
      }
    >({
      url: replacePath('/pairs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size', 'keyword', 'orderKey', 'orderValue'], [])
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
  },
  'Watch@get-watch-list'(args: {
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_WatchResponse[]
      }
    >({
      url: replacePath('/watchs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], [])
    })
  },
  'Watch@create-watch'(args: ApiDocuments.proto_WatchCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'Watch@update-watch'(
    args: {
      /**
       * @description watch id
       */
      watchId: string
    } & ApiDocuments.proto_WatchUpdateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs/{watchId}', args),
      method: 'PUT',
      ...extract('PUT', args, [], ['watchId'])
    })
  },
  'Watch@get-watch-pair-list'(
    args: {
      /**
       * @description watch id
       */
      watchId: string
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
        list?: ApiDocuments.proto_WatchPairResponse[]
      }
    >({
      url: replacePath('/watchs/{watchId}/pairs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['watchId'])
    })
  },
  'Watch@create-watch-pair'(
    args: {
      /**
       * @description watch id
       */
      watchId: string
    } & ApiDocuments.proto_WatchPairCreateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs/{watchId}/pairs', args),
      method: 'POST',
      ...extract('POST', args, [], ['watchId'])
    })
  },
  'Watch@delete-watch-pair'(args: {
    /**
     * @description watch id
     */
    watchId: string
    /**
     * @description watch pair id
     */
    pairId: string
  }) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs/{watchId}/pairs/{pairId}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['watchId', 'pairId'])
    })
  }
}

export type ServiceKeys = keyof typeof services

export type ServiceArg<T extends ServiceKeys> = Parameters<typeof services[T]>[0]

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type ServiceReturn<T extends ServiceKeys> = Awaited<ReturnType<typeof services[T]>>['data']

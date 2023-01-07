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
  'CustomFunction@save-custom-func'(
    args: {
      /**
       * @description custom-func
       */
      function: string
    } & {}
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/customs/{function}', args),
      method: 'POST',
      ...extract('POST', args, [], ['function'])
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
     * @description categoires
     */
    categoires?: string[]
    /**
     * @description chain id
     */
    chainIds?: number[]
    /**
     * @description dex id
     */
    dexs?: string[]
    /**
     * @description query keyword
     */
    keyword?: string
    liquidityMax?: number
    liquidityMin?: number
    /**
     * @description hour
     */
    pairAgeMax?: number
    /**
     * @description hour
     */
    pairAgeMin?: number
    /**
     * @description query rank by; field, According to the data structure, splicing field strings with dots
     */
    rankBy?: string
    /**
     * @description query rank type; 1 asc, -1 desc
     */
    rankType?: number
    /**
     * @description 1m,5m,15m,1h,4h,6h,24h
     */
    timeInterval?: string
    /**
     * @description %  100% = 1
     */
    trendMax?: number
    /**
     * @description %  100% = 1
     */
    trendMin?: number
    txnsMax?: number
    txnsMin?: number
    volumeMax?: number
    volumeMin?: number
  }) {
    return requestAdapter<
      ApiDocuments.proto_PageData & {
        list?: ApiDocuments.proto_PairBasicResponse[]
      }
    >({
      url: replacePath('/pairs', args),
      method: 'GET',
      ...extract(
        'GET',
        args,
        [
          'page',
          'size',
          'categoires',
          'chainIds',
          'dexs',
          'keyword',
          'liquidityMax',
          'liquidityMin',
          'pairAgeMax',
          'pairAgeMin',
          'rankBy',
          'rankType',
          'timeInterval',
          'trendMax',
          'trendMin',
          'txnsMax',
          'txnsMin',
          'volumeMax',
          'volumeMin'
        ],
        []
      )
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

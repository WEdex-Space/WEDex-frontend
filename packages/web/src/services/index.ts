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
    wallet_address: string
  }) {
    return requestAdapter<ApiDocuments.proto_NonceResponse>({
      url: replacePath('/authorizations/{wallet_address}/nonce', args),
      method: 'GET',
      ...extract('GET', args, [], ['wallet_address'])
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
      tab_id: string
    } & ApiDocuments.proto_MultiChartTabUpdateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs/{tab_id}', args),
      method: 'PUT',
      ...extract('PUT', args, [], ['tab_id'])
    })
  },
  'MultiChart@get-multi-chart-pair-list'(
    args: {
      /**
       * @description tab id
       */
      tab_id: string
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
      url: replacePath('/multi-chart-tabs/{tab_id}/pairs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['tab_id'])
    })
  },
  'MultiChart@create-multi-chart-pair'(
    args: {
      /**
       * @description multi chart tab id
       */
      tab_id: string
    } & ApiDocuments.proto_MultiChartPairCreateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs/{tab_id}/pairs', args),
      method: 'POST',
      ...extract('POST', args, [], ['tab_id'])
    })
  },
  'MultiChart@delete-multi-chart-pair'(args: {
    /**
     * @description multi-chart-tab id
     */
    tab_id: string
    /**
     * @description multi-chart-tab-pair id
     */
    pair_id: string
  }) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs/{tab_id}/pairs/{pair_id}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['tab_id', 'pair_id'])
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
      notebook_id: string
    } & ApiDocuments.proto_NotebookUpdateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notebooks/{notebook_id}', args),
      method: 'PUT',
      ...extract('PUT', args, [], ['notebook_id'])
    })
  },
  'Notebook@delete-notebook'(args: {
    /**
     * @description notebook id
     */
    notebook_id: string
  }) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notebooks/{notebook_id}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['notebook_id'])
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
    pair_id: string
  }) {
    return requestAdapter<ApiDocuments.proto_PairResponse>({
      url: replacePath('/pairs/{pair_id}', args),
      method: 'GET',
      ...extract('GET', args, [], ['pair_id'])
    })
  },
  'Pair@get-kline-list'(
    args: {
      /**
       * @description pair id
       */
      pair_id: string
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
      url: replacePath('/pairs/{pair_id}/kline/{type}', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['pair_id', 'type'])
    })
  },
  'Pair@get-pair-transaction-list'(
    args: {
      /**
       * @description pair id
       */
      pair_id: string
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
      url: replacePath('/pairs/{pair_id}/transactions', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['pair_id'])
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
    share_code: string
  }) {
    return requestAdapter<any>({
      url: replacePath('/share/{share_code}', args),
      method: 'GET',
      ...extract('GET', args, [], ['share_code'])
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
      watch_id: string
    } & ApiDocuments.proto_WatchUpdateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs/{watch_id}', args),
      method: 'PUT',
      ...extract('PUT', args, [], ['watch_id'])
    })
  },
  'Watch@get-watch-pair-list'(
    args: {
      /**
       * @description watch id
       */
      watch_id: string
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
      url: replacePath('/watchs/{watch_id}/pairs', args),
      method: 'GET',
      ...extract('GET', args, ['page', 'size'], ['watch_id'])
    })
  },
  'Watch@create-watch-pair'(
    args: {
      /**
       * @description watch id
       */
      watch_id: string
    } & ApiDocuments.proto_WatchPairCreateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs/{watch_id}/pairs', args),
      method: 'POST',
      ...extract('POST', args, [], ['watch_id'])
    })
  },
  'Watch@delete-watch-pair'(args: {
    /**
     * @description watch id
     */
    watch_id: string
    /**
     * @description watch pair id
     */
    pair_id: string
  }) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs/{watch_id}/pairs/{pair_id}', args),
      method: 'DELETE',
      ...extract('DELETE', args, [], ['watch_id', 'pair_id'])
    })
  }
}

export type ServiceKeys = keyof typeof services

export type ServiceArg<T extends ServiceKeys> = Parameters<typeof services[T]>[0]

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

export type ServiceReturn<T extends ServiceKeys> = Awaited<ReturnType<typeof services[T]>>['data']

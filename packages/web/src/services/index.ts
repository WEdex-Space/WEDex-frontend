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
  'DEX@get-dex-list'(args?: any) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_DEXResponse[]
      }
    >({
      url: replacePath('/dexs', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  'MultiChart@get-multi-chart-tab-list'(args?: any) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_MultiChartTabResponse[]
      }
    >({
      url: replacePath('/multi-chart-tabs', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  'MultiChart@update-multi-chart'(args: ApiDocuments.proto_MultiChartTabUpdateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs', args),
      method: 'PUT',
      ...extract('PUT', args, [], [])
    })
  },
  'MultiChart@create-multi-chart-tab'(args: ApiDocuments.proto_MultiChartTabCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'MultiChart@get-multi-chart-list'(args: {
    /**
     * @description watch id
     */
    tab_id: string
  }) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_MultiChartPairResponse[]
      }
    >({
      url: replacePath('/multi-chart-tabs/{tab_id}/pairs', args),
      method: 'GET',
      ...extract('GET', args, [], ['tab_id'])
    })
  },
  'MultiChart@create-multi-chart-pair'(
    args: {
      /**
       * @description multi chart tab id
       */
      watch_id: string
    } & ApiDocuments.proto_MultiChartPairCreateRequest
  ) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/multi-chart-tabs/{tab_id}/pairs', args),
      method: 'POST',
      ...extract('POST', args, [], ['watch_id'])
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
  'Notebook@get-notebook-list'(args?: any) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_NotebookResponse[]
      }
    >({
      url: replacePath('/notebooks', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  'Notebook@update-notebook-list'(args: ApiDocuments.proto_NotebookUpdateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notebooks', args),
      method: 'PUT',
      ...extract('PUT', args, [], [])
    })
  },
  'Notebook@create-notebook-list'(args: ApiDocuments.proto_NotebookCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notebooks', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'Notification@get-notification-list'(args?: any) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_NotificationResponse[]
      }
    >({
      url: replacePath('/notifications', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  'Notification@create-notification-list'(args: ApiDocuments.proto_NotificationCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/notifications', args),
      method: 'POST',
      ...extract('POST', args, [], [])
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
  'Watch@get-watch-list'(args?: any) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_WatchResponse[]
      }
    >({
      url: replacePath('/watchs', args),
      method: 'GET',
      ...extract('GET', args, [], [])
    })
  },
  'Watch@update-watch'(args: ApiDocuments.proto_WatchUpdateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs', args),
      method: 'PUT',
      ...extract('PUT', args, [], [])
    })
  },
  'Watch@create-watch'(args: ApiDocuments.proto_WatchCreateRequest) {
    return requestAdapter<ApiDocuments.proto_MessageResponse>({
      url: replacePath('/watchs', args),
      method: 'POST',
      ...extract('POST', args, [], [])
    })
  },
  'Watch@get-watch-pair-list'(args: {
    /**
     * @description watch id
     */
    watch_id: string
  }) {
    return requestAdapter<
      ApiDocuments.proto_ListData & {
        list?: ApiDocuments.proto_WatchPairResponse[]
      }
    >({
      url: replacePath('/watchs/{watch_id}/pairs', args),
      method: 'GET',
      ...extract('GET', args, [], ['watch_id'])
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

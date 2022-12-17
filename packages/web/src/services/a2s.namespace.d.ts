/* eslint-disable */
interface BasicDto {
  [key: string]: any
}
export declare namespace ApiDocuments {
  export interface model_EndPoint extends BasicDto {
    rpc_url?: string
    wss_url?: string
  }
  export interface proto_ChainResponse extends BasicDto {
    _id?: string
    chain_id?: number
    description?: string
    end_point?: ApiDocuments.model_EndPoint
    explorer?: string
    logo?: string
    name?: string
  }
  export interface proto_DEXResponse extends BasicDto {
    _id?: string
    chain_id?: number
    domain?: string
    logo?: string
    name?: string
  }
  export interface proto_JwtAuthorizationResponse extends BasicDto {
    /**
     * @description Token
     */
    token: string
  }
  export interface proto_ListData extends BasicDto {
    /**
     * @description data list
     */
    list?: any
    /**
     * @description total
     */
    total: number
  }
  export interface proto_MessageResponse extends BasicDto {
    /**
     * @description Message
     */
    message: string
  }
  export interface proto_MultiChartPairCreateRequest extends BasicDto {
    dex_pair_contract_address: string
  }
  export interface proto_MultiChartPairResponse extends BasicDto {
    _id?: string
    created_at?: string
    dex_pair_contract_address?: string
    sort_index?: number
    updated_at?: string
  }
  export interface proto_MultiChartTabCreateRequest extends BasicDto {
    name: string
    setting?: {}
  }
  export interface proto_MultiChartTabResponse extends BasicDto {
    _id?: string
    created_at?: string
    name?: string
    setting?: {}
    sort_index?: number
    updated_at?: string
    user_wallet_address?: string
  }
  export interface proto_MultiChartTabUpdateRequest extends BasicDto {
    _id: string
    name: string
    setting?: {}
  }
  export interface proto_NonceResponse extends BasicDto {
    /**
     * @description expiration time
     */
    expiration_time: string
    /**
     * @description nonce
     */
    nonce: string
  }
  export interface proto_NotebookCreateRequest extends BasicDto {
    content: string
  }
  export interface proto_NotebookResponse extends BasicDto {
    _id?: string
    content?: string
  }
  export interface proto_NotebookUpdateRequest extends BasicDto {
    _id: string
    content: string
  }
  export interface proto_NotificationCreateRequest extends BasicDto {
    condition: any
    content: string
    type: number
  }
  export interface proto_NotificationResponse extends BasicDto {
    _id?: string
    condition?: any
    content?: string
    /**
     * @description ture 以及提现了
     */
    state?: boolean
    type?: number
  }
  export interface proto_UploadResponse extends BasicDto {
    url: string
  }
  export interface proto_WalletLoginRequest extends BasicDto {
    /**
     * @description Wallet nonce
     */
    nonce: string
    /**
     * @description Wallet signature
     */
    signature: string
    /**
     * @description Wallet address
     */
    wallet_address: string
  }
  export interface proto_WatchCreateRequest extends BasicDto {
    name: string
  }
  export interface proto_WatchPairCreateRequest extends BasicDto {
    dex_pair_contract_address: string
  }
  export interface proto_WatchPairResponse extends BasicDto {
    _id?: string
    chain_id?: number
    created_at?: string
    dex_pair_contract_address?: string
    sort_index?: number
    updated_at?: string
    user_wallet_address?: string
  }
  export interface proto_WatchResponse extends BasicDto {
    _id?: string
    chain_id?: string
    created_at?: string
    sort_index?: number
    updated_at?: string
    user_wallet_address?: string
  }
  export interface proto_WatchUpdateRequest extends BasicDto {
    _id: string
    name: string
  }
}

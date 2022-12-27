/* eslint-disable */
interface BasicDto {
  [key: string]: any
}
export declare namespace ApiDocuments {
  export interface model_EndPoint extends BasicDto {
    rpcUrl?: string
    wssUrl?: string
  }
  export interface model_SocialBook extends BasicDto {
    _id?: string
    socialTool?: ApiDocuments.model_SocialTool
    socialToolId?: string
    targetId?: string
    type?: number
    value?: string
  }
  export interface model_SocialTool extends BasicDto {
    _id?: string
    domain?: string
    logo?: string
    name?: string
    sortIndex?: number
  }
  export interface model_Token extends BasicDto {
    _id?: string
    chainId?: number
    contractAddress?: string
    decimals?: number
    description?: string
    logo?: string
    name?: string
    socials?: ApiDocuments.model_SocialBook[]
    symbol?: string
    totalSupply?: number
  }
  export interface model_TokenBasic extends BasicDto {
    _id?: string
    chainId?: number
    contractAddress?: string
    decimals?: number
    logo?: string
    name?: string
    socials?: ApiDocuments.model_SocialBook[]
    symbol?: string
    totalSupply?: number
  }
  export interface proto_ChainResponse extends BasicDto {
    _id?: string
    chainId?: number
    currentSymbol?: string
    description?: string
    endPoint?: ApiDocuments.model_EndPoint
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
    createdAt?: string
    dex_pair_contract_address?: string
    sort_index?: number
    updatedAt?: string
  }
  export interface proto_MultiChartTabCreateRequest extends BasicDto {
    name: string
    setting?: {}
  }
  export interface proto_MultiChartTabResponse extends BasicDto {
    _id?: string
    createdAt?: string
    name?: string
    setting?: {}
    sort_index?: number
    updatedAt?: string
    user_wallet_address?: string
  }
  export interface proto_MultiChartTabUpdateRequest extends BasicDto {
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
  export interface proto_PairBasicResponse extends BasicDto {
    _id?: string
    chainId?: number
    dexId?: string
    name?: string
    token0?: ApiDocuments.model_TokenBasic
    token1?: ApiDocuments.model_TokenBasic
    tokenW0?: string
    tokenW1?: string
  }
  export interface proto_PairResponse extends BasicDto {
    _id?: string
    chainId?: number
    decimals?: number
    dexId?: string
    factory?: string
    logo?: string
    name?: string
    pairAddress?: string
    reverse0?: number
    reverse1?: number
    symbol?: string
    token0?: ApiDocuments.model_Token
    token1?: ApiDocuments.model_Token
    tokenW0?: string
    tokenW1?: string
  }
  export interface proto_PairTickResponse extends BasicDto {
    _id?: string
    close?: number
    high?: number
    low?: number
    open?: number
    time?: string
    volume?: number
  }
  export interface proto_PairTransactionResponse extends BasicDto {
    _id?: string
    amount0In?: number
    amount0Out?: number
    amount1In?: number
    amount1Out?: number
    blockGasLimit?: number
    blockGasUsed?: number
    blockNumber?: number
    blockTime?: number
    chainId?: number
    effectiveGasPrice?: number
    from?: string
    gasUsed?: number
    pairAddress?: string
    pairId?: string
    to?: string
    transactionFee?: number
    transactionHash?: string
  }
  export interface proto_ShareSetRequest extends BasicDto {
    description: string
    image: string
    route: string
    title: string
  }
  export interface proto_ShareSetResponse extends BasicDto {
    share_code: string
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
    createdAt?: string
    dex_pair_contract_address?: string
    sort_index?: number
    updatedAt?: string
    user_wallet_address?: string
  }
  export interface proto_WatchResponse extends BasicDto {
    _id?: string
    chain_id?: string
    createdAt?: string
    sort_index?: number
    updatedAt?: string
    user_wallet_address?: string
  }
  export interface proto_WatchUpdateRequest extends BasicDto {
    name: string
  }
}

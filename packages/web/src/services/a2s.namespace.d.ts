/* eslint-disable */
interface BasicDto {
  [key: string]: any
}
export declare namespace ApiDocuments {
  export interface model_Chain extends BasicDto {
    _id?: string
    chainId?: number
    currentSymbol?: string
    description?: string
    explorer?: string
    logo?: string
    name?: string
    rpcUrl?: string
    wssUrl?: string
  }
  export interface model_DEX extends BasicDto {
    _id?: string
    appUrl?: string
    chainId?: number
    dexType?: number
    factory?: string
    logo?: string
    name?: string
    officialSite?: string
    router01?: string
    router02?: string
  }
  export interface model_Pair extends BasicDto {
    _id?: string
    chainId?: number
    createdAt?: number
    decimals?: number
    dex?: ApiDocuments.model_DEX
    dexId?: string
    factory?: string
    logo?: string
    name?: string
    network?: ApiDocuments.model_Chain
    pairAddress?: string
    pairDetail?: {}
    pairReportIM?: ApiDocuments.model_PairReportIM
    symbol?: string
    token0?: {}
    token1?: {}
    tokenW0?: string
    tokenW0Info?: {}
    tokenW1?: string
    tokenW1Info?: {}
    views?: number
    watchs?: {}[]
  }
  export interface model_PairReportIM extends BasicDto {
    _id?: string
    chainId?: number
    dexId?: string
    fdv?: number
    last15m?: ApiDocuments.model_PairReportIMTimeData
    last1h?: ApiDocuments.model_PairReportIMTimeData
    last1m?: ApiDocuments.model_PairReportIMTimeData
    last24h?: ApiDocuments.model_PairReportIMTimeData
    last30m?: ApiDocuments.model_PairReportIMTimeData
    last4h?: ApiDocuments.model_PairReportIMTimeData
    last5m?: ApiDocuments.model_PairReportIMTimeData
    last6h?: ApiDocuments.model_PairReportIMTimeData
    liquidity?: number
    mktCap?: number
    pairId?: string
    priceW0?: number
    priceW0USD?: number
    priceW1?: number
    priceW1USD?: number
  }
  export interface model_PairReportIMTimeData extends BasicDto {
    makers?: ApiDocuments.model_PairReportIMTimeDataInfo
    price?: number
    priceAvg?: ApiDocuments.model_PairReportIMTimeDataInfo
    priceChange?: number
    priceHigh?: number
    priceLow?: number
    priceUSD?: number
    txns?: ApiDocuments.model_PairReportIMTimeDataInfo
    views?: number
    volume?: ApiDocuments.model_PairReportIMTimeDataInfo
  }
  export interface model_PairReportIMTimeDataInfo extends BasicDto {
    buys?: number
    sells?: number
    total?: number
  }
  export interface proto_ChainResponse extends BasicDto {
    _id?: string
    chainId?: number
    currentSymbol?: string
    description?: string
    explorer?: string
    logo?: string
    name?: string
    rpcUrl?: string
    wssUrl?: string
  }
  export interface proto_DEXResponse extends BasicDto {
    _id?: string
    appUrl?: string
    chainId?: number
    dexType?: number
    factory?: string
    logo?: string
    name?: string
    officialSite?: string
    router01?: string
    router02?: string
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
    chainId: number
    dexPairContractAddress: string
    sortIndex?: number
  }
  export interface proto_MultiChartPairResponse extends BasicDto {
    _id?: string
    chainId?: number
    dexPairContractAddress?: string
    pair?: ApiDocuments.model_Pair
    sortIndex?: number
    tabId?: string
    userWalletAddress?: string
  }
  export interface proto_MultiChartTabCreateRequest extends BasicDto {
    name: string
    setting?: {}
    sortIndex?: number
  }
  export interface proto_MultiChartTabResponse extends BasicDto {
    _id?: string
    name?: string
    setting?: {}
    sortIndex?: number
    userWalletAddress?: string
  }
  export interface proto_MultiChartTabUpdateRequest extends BasicDto {
    name: string
    setting?: {}
    sortIndex?: number
  }
  export interface proto_NonceResponse extends BasicDto {
    /**
     * @description expiration time
     */
    expirationTime: string
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
    userWalletAddress?: string
  }
  export interface proto_NotebookUpdateRequest extends BasicDto {
    content: string
  }
  export interface proto_NotificationCreateRequest extends BasicDto {
    condition: {}
    content: string
    type: number
  }
  export interface proto_NotificationResponse extends BasicDto {
    _id?: string
    condition?: {}
    content?: string
    /**
     * @description ture 已经提醒了
     */
    state?: boolean
    type?: number
    userWalletAddress?: string
  }
  export interface proto_PageData extends BasicDto {
    /**
     * @description data list
     */
    list?: any
    /**
     * @description pagination select current page, default: 1
     */
    page?: number
    /**
     * @description pagination size, default: 20
     */
    size?: number
    /**
     * @description total
     */
    total: number
  }
  export interface proto_PairBasicResponse extends BasicDto {
    _id?: string
    chainId?: number
    createdAt?: number
    dex?: ApiDocuments.model_DEX
    dexId?: string
    name?: string
    network?: ApiDocuments.model_Chain
    pairReportIM?: ApiDocuments.proto_PairReportIM
    token0?: {}
    token1?: {}
    tokenW0?: string
    tokenW0Info?: {}
    tokenW1?: string
    tokenW1Info?: {}
    watchs?: {}[]
  }
  export interface proto_PairReportIM extends BasicDto {
    _id?: string
    chainId?: number
    dexId?: string
    fdv?: number
    last1h?: ApiDocuments.model_PairReportIMTimeData
    last24h?: ApiDocuments.model_PairReportIMTimeData
    last4h?: ApiDocuments.model_PairReportIMTimeData
    last5m?: ApiDocuments.model_PairReportIMTimeData
    last6h?: ApiDocuments.model_PairReportIMTimeData
    liquidity?: number
    mktCap?: number
    pairId?: string
    priceW0?: number
    priceW1?: number
  }
  export interface proto_PairReportResponse extends BasicDto {
    FDV?: number
    MKTCap?: number
    _id?: string
    chainId?: number
    dexId?: string
    happenAt?: string
    liquidity?: number
    makers?: number
    makersBuys?: number
    makersSells?: number
    pairId?: string
    priceAvg?: number
    priceAvgBuys?: number
    priceAvgSells?: number
    priceEnd?: number
    priceMax?: number
    priceMin?: number
    priceStart?: number
    trendType?: number
    txns?: number
    txnsBuys?: number
    txnsSells?: number
    views?: number
    volume?: number
    volumeBuys?: number
    volumeSells?: number
  }
  export interface proto_PairResponse extends BasicDto {
    _id?: string
    chainId?: number
    createdAt?: number
    decimals?: number
    dex?: ApiDocuments.model_DEX
    dexId?: string
    factory?: string
    logo?: string
    name?: string
    network?: ApiDocuments.model_Chain
    pairAddress?: string
    pairDetail?: {}
    pairReportIM?: ApiDocuments.model_PairReportIM
    symbol?: string
    token0?: {}
    token1?: {}
    tokenW0?: string
    tokenW0Info?: {}
    tokenW1?: string
    tokenW1Info?: {}
    views?: number
    watchs?: {}[]
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
    dexId?: string
    effectiveGasPrice?: number
    from?: string
    gasUsed?: number
    pairAddress?: string
    pairId?: string
    to?: string
    token0Price?: number
    token0PriceUSD?: number
    token1Price?: number
    token1PriceUSD?: number
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
    shareCode: string
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
    walletAddress: string
  }
  export interface proto_WatchCreateRequest extends BasicDto {
    name: string
    sortIndex?: number
  }
  export interface proto_WatchPairCreateRequest extends BasicDto {
    chainId: number
    dexPairContractAddress: string
    sortIndex?: number
  }
  export interface proto_WatchPairResponse extends BasicDto {
    _id?: string
    chainId?: number
    dexPairContractAddress?: string
    pair?: ApiDocuments.model_Pair
    sortIndex?: number
    userWalletAddress?: string
    watchId?: string
  }
  export interface proto_WatchResponse extends BasicDto {
    _id?: string
    name?: string
    sortIndex?: number
    userWalletAddress?: string
  }
  export interface proto_WatchUpdateRequest extends BasicDto {
    name: string
    sortIndex?: number
  }
}

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
    lastTxAt?: number
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
    priceChangeAbs?: number
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
  export interface model_SearchRanks extends BasicDto {
    /**
     * @description query rank by; field, According to the data structure, splicing field strings with dots
     */
    rankBy?: string
    /**
     * @description query rank type; 1 asc, -1 desc
     */
    rankType?: number
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
    lastTxAt?: number
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
  }
  export interface proto_PairTransactionResponse extends BasicDto {
    _id?: string
    amount0In?: number
    amount0Out?: number
    amount1In?: number
    amount1Out?: number
    amountInUSD?: number
    amountOutUSD?: number
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
  export interface proto_QueryPairRequest extends BasicDto {
    /**
     * @description categoires
     */
    categoires?: string[]
    /**
     * @description chain ids
     */
    chainIds?: number[]
    /**
     * @description dex ids
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
     * @description pair ids
     */
    pairIds?: string[]
    priceChangeAbsMax?: number
    priceChangeAbsMin?: number
    priceChangeMax?: number
    priceChangeMin?: number
    /**
     * @description multi-rank
     */
    ranks?: ApiDocuments.model_SearchRanks[]
    /**
     * @description 1m,5m,15m,1h,4h,6h,24h
     */
    timeInterval?: string
    txnsBuysMax?: number
    txnsBuysMin?: number
    txnsMax?: number
    txnsMin?: number
    txnsSellsMax?: number
    txnsSellsMin?: number
    volumeMax?: number
    volumeMin?: number
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
}

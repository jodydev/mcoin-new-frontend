import { Percent } from '@pancakeswap/swap-sdk-core'
import { ERC20Token } from './entities/token'

export enum ChainId {
  ETHEREUM = 1,
  BSC = 323,
  BASE = 8453,
  POLYGON = 137,
  ARBITRUM = 42161,
  SHIMMER2 = 148,
  AVAX = 43114,
  FANTOM = 250,
  CRONOS = 25,
  PULSE = 369,
  OPTIMISM = 10,
  ZKSYNC = 324,
}

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const FACTORY_ADDRESS = "0x3411E37711fdFefa8CF9759B683200A668dD7086"

export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS,
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BASE]: "0x78fA7Fa39CF6544DD9768A75d8Ad8C45854aE530",
  [ChainId.POLYGON]: FACTORY_ADDRESS,
}
export const INIT_CODE_HASH = "0xafc282e6a3b7c33f9b085f02fd561af576187c74b224d5066d72e499edb2a99f"

export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH,
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BASE]: "0x1e6e24914b2abfdd5ec33609095c9b570a9e1dc137992c0995bb45f57cf1932a",
  [ChainId.POLYGON]: INIT_CODE_HASH,
}

export const WETH9 = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xAc2fE71FED3BA1090a50491FE6Be941FBcbcc1Bf',
    18,
    'WMCOIN',
    'Wrapped MCOIN',
    'https://binance.com'
  ),
  [ChainId.BASE]: new ERC20Token(
    ChainId.BASE,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.POLYGON]: new ERC20Token(
    ChainId.POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic',
    'https://polygon.technology/'
  ),
  [ChainId.ARBITRUM]: new ERC20Token(
    ChainId.ARBITRUM,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.ZKSYNC]: new ERC20Token(
    ChainId.ZKSYNC,
    '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.OPTIMISM]: new ERC20Token(
    ChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.FANTOM]: new ERC20Token(
    ChainId.FANTOM,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped Fantom',
    ''
  ),
  [ChainId.AVAX]: new ERC20Token(
    ChainId.AVAX,
    '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    18,
    'WAVAX',
    'Wrapped AVAX',
    ''
  ),
  [ChainId.CRONOS]: new ERC20Token(
    ChainId.CRONOS,
    '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    18,
    'WCRO',
    'Wrapped CRO',
    ''
  ),
  [ChainId.PULSE]: new ERC20Token(
    ChainId.PULSE,
    '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
    18,
    'WPLS',
    'Wrapped Pulse',
    ''
  ),
  [ChainId.SHIMMER2]: new ERC20Token(
    ChainId.SHIMMER2,
    '0x16bb40487386d83E042968FDDF2e72475eddF837',
    18,
    'WSMR',
    'Wrapped Shimmer',
    ''
  ),
}

export const WBNB = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
    18,
    'WBNB',
    'Wrapped MCOIN',
    'https://www.binance.org'
  ),
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xAc2fE71FED3BA1090a50491FE6Be941FBcbcc1Bf',
    18,
    'WMCOIN',
    'Wrapped MCOIN',
    'https://www.binance.org'
  ),
  [ChainId.BASE]: new ERC20Token(
    ChainId.BASE,
    '0xAc2fE71FED3BA1090a50491FE6Be941FBcbcc1Bf',
    18,
    'WBNB',
    'Wrapped MCOIN',
    'https://www.binance.org'
  ),
  [ChainId.POLYGON]: new ERC20Token(
    ChainId.POLYGON,
    '0xAc2fE71FED3BA1090a50491FE6Be941FBcbcc1Bf',
    18,
    'WBNB',
    'Wrapped MCOIN',
    'https://www.binance.org'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.BSC]: WBNB[ChainId.BSC],
  [ChainId.BASE]: WETH9[ChainId.BASE],
  [ChainId.POLYGON]: WETH9[ChainId.POLYGON],
  [ChainId.ARBITRUM]: WETH9[ChainId.ARBITRUM],
  [ChainId.SHIMMER2]: WETH9[ChainId.SHIMMER2],
  [ChainId.AVAX]: WETH9[ChainId.AVAX],
  [ChainId.FANTOM]: WETH9[ChainId.FANTOM],
  [ChainId.CRONOS]: WETH9[ChainId.CRONOS],
  [ChainId.ZKSYNC]: WETH9[ChainId.ZKSYNC],
  [ChainId.OPTIMISM]: WETH9[ChainId.OPTIMISM],
  [ChainId.PULSE]: WETH9[ChainId.PULSE],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.ETHEREUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.BSC]: { name: 'Binance Chain Native Token', symbol: 'MCOIN', decimals: 18 },
  [ChainId.BASE]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.POLYGON]: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
  [ChainId.ARBITRUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.OPTIMISM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.ZKSYNC]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.CRONOS]: { name: 'Cronos', symbol: 'CRO', decimals: 18 },
  [ChainId.FANTOM]: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  [ChainId.AVAX]: { name: 'Avax', symbol: 'AVAX', decimals: 18 },
  [ChainId.PULSE]: { name: 'Pulse', symbol: 'PLS', decimals: 18 },
  [ChainId.SHIMMER2]: { name: 'Shimmer', symbol: 'SMR', decimals: 18 },
}

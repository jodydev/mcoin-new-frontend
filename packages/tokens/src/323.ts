import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { BUSD_BSC, CAKE, DAI, USDT_BSC, USDC, USDT } from './common'

export const bscTokens = {
  // bnb here points to the wbnb contract. Wherever the currency MCOIN is required, conditional checks for the symbol 'MCOIN' can be used
  wbnb: new ERC20Token(
    ChainId.BSC,
    '0xAc2fE71FED3BA1090a50491FE6Be941FBcbcc1Bf',
    18,
    'WMCOIN',
    'WMCOIN',
    'https://www.binance.com/',
  ),
  // bnb: new ERC20Token(
  //   ChainId.BSC,
  //   '0xAc2fE71FED3BA1090a50491FE6Be941FBcbcc1Bf',
  //   18,
  //   'MCOIN',
  //   'MCOIN',
  //   'https://www.binance.com/',
  // ),
  cake: CAKE[ChainId.BSC],
  usdt: USDT[ChainId.BSC],
  usdc: USDC[ChainId.BSC],
  dai: DAI[ChainId.BSC],
}

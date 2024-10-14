import { Token } from '@pancakeswap/sdk'
import { bsc1Tokens } from '@pancakeswap/tokens'
import { bscWarningTokens } from 'config/constants/warningTokens'

const { bondly, itam } = bsc1Tokens
const { pokemoney, free, safemoon, gala } = bscWarningTokens

interface WarningTokenList {
  [key: string]: Token
}

const SwapWarningTokens = <WarningTokenList>{
  safemoon,
  bondly,
  itam,
  pokemoney,
  free,
  gala,
}

export default SwapWarningTokens

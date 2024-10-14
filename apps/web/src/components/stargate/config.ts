import { arbitrum, polygon } from 'wagmi/chains'

// const VERSION = '0.0.25-mainnet.20'
const VERSION = '0.0.32'
const SHA384 = '4dxIDlHJekDOVHv1EATqoU0J7CR+ikWJsNUVK5t472sahTiZUricbw3tkjWvXXjJ'
export const PARTNER_ID = 0x0002
export const FEE_COLLECTOR = '0xaBb21038A287eA3eE6D1949B20ba3f4f0F6C26C5'
export const FEE_TENTH_BPS = '0'

export const STARGATE_JS = {
  src: `https://unpkg.com/@layerzerolabs/stargate-ui@${VERSION}/element.js`,
  integrity: `sha384-${SHA384}`,
}

export const CHAINS_STARGATE = [arbitrum, polygon]

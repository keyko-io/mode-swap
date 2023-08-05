import { initializeConnector } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { Buffer } from 'buffer'

import { toWeb3Connector } from './utils'
import { JSON_RPC_URL } from 'src/constants/jsonRpcUrl'

// WalletConnect relies on Buffer, so it must be polyfilled.
if (!('Buffer' in window)) {
  (window as any).Buffer = Buffer
}

export function isWalletConnect(connector: Connector) {
  return connector instanceof WalletConnect
}

const connector = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(
      {
        actions,
        options: {rpc: { 1: JSON_RPC_URL }}
      }
    )
)
export default toWeb3Connector(connector)

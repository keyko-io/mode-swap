import { initializeConnector } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect-v2'
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
// @ts-ignore
const connector = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
        actions,
        options: {showQrModal: false, projectId: "", rpcMap: { 919: JSON_RPC_URL }},
        defaultChainId: 919
        }
    )
)
export default toWeb3Connector(connector)

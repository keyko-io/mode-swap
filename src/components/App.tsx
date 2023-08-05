import { useCallback, useRef, useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { SupportedLocale, SUPPORTED_LOCALES, SwapWidget, Theme } from '@keyko.io/widgets'

// ↓↓↓ Don't forget to import the widgets' fonts! ↓↓↓
import '@keyko.io/widgets/fonts.css'
// ↑↑↑

import { useActiveProvider } from '../connectors'
import Web3Connectors from './Web3Connectors'
import styles from '../styles/Home.module.css'
import { JSON_RPC_URL } from 'src/constants/jsonRpcUrl'
import tokenList from 'src/constants/tokenList.json'

const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
const theme: Theme = {
  primary: '#dffe00',
  secondary: '#919467',
  interactive: '#121212',
  container: '#070707',
  module: '#121212',
  accent: '#1c1c0d',
  onAccent: '#dffe00',
  outline: '#121212',
  dialog: '#90955e',
  networkDefaultShadow: '#dffe00',
}

export default function App() {
  // When a user clicks "Connect your wallet" in the SwapWidget, this callback focuses the connectors.
  const connectors = useRef<HTMLDivElement>(null)
  const focusConnectors = useCallback(() => connectors.current?.focus(), [])

  // The provider to pass to the SwapWidget.
  // This is a Web3Provider (from @ethersproject) supplied by @web3-react; see ./connectors.ts.
  const provider = useActiveProvider()

  // The locale to pass to the SwapWidget.
  // This is a value from the SUPPORTED_LOCALES exported by @kokal33/widgets.
  const [locale, setLocale] = useState<SupportedLocale>('en-US')
  const onSelectLocale = useCallback((e: any) => setLocale(e.target.value), [])

  return (
    <div className={styles.container}>
      <div className={styles.i18n}>
        <label style={{ display: 'flex' }}>
          <FiGlobe />
        </label>
        <select onChange={onSelectLocale}>
          {SUPPORTED_LOCALES.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>Mode Swap</h1>

        <div className={styles.demo}>
          <div className={styles.connectors} ref={connectors} tabIndex={-1}>
            <Web3Connectors />
          </div>

          <div className={styles.widget}>
            <SwapWidget
              jsonRpcUrlMap={JSON_RPC_URL}
              tokenList={tokenList}
              provider={provider}
              locale={locale}
              onConnectWalletClick={focusConnectors}
              defaultInputTokenAddress="NATIVE"
              defaultInputAmount="1"
              defaultOutputTokenAddress={UNI}
              theme={theme}
            />
          </div>
        </div>

        <hr className={styles.rule} />
      </main>
    </div>
  )
}

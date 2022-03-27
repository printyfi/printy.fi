import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { NetworkConnector } from '@web3-react/network-connector'

const POLLING_INTERVAL = 22000
const RPC_URLS = {
  43114: `https://api.avax.network/ext/bc/C/rpc`,
  4002: 'https://rpc.testnet.fantom.network',
}

let obj = {}
if (process.env.NEXT_PUBLIC_CHAINID == 43114) {
  obj = { 43114: RPC_URLS[43114] }
} else {
  obj = { 4002: RPC_URLS[4002] }
}

export const network = new NetworkConnector({ urls: obj });

export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(process.env.NEXT_PUBLIC_CHAINID)],
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    43114: RPC_URLS[43114],
    4002: RPC_URLS[4002],
  },
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[process.env.NEXT_PUBLIC_CHAINID],
  appName: 'Printy',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
})

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  Typography,
  Button,
  SvgIcon,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { withStyles, withTheme } from '@material-ui/core/styles'
import ListIcon from '@material-ui/icons/List'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'

import Navigation from '../navigation'
import Unlock from '../unlock'
import TransactionQueue from '../transactionQueue'

import { ACTIONS } from '../../stores/constants'

import stores from '../../stores'
import { formatAddress } from '../../utils'

import classes from './header.module.css'
import Image from 'next/image'

function SiteLogo(props) {
  const { className } = props
  return (
    <SvgIcon viewBox="0 0 220.7 36.5" className={className}>
      <g transform="translate(0.000000,33.000000) scale(0.100000,-0.100000)"
      fill="#000000" stroke="none">
      <path d="M0 170 l0 -130 25 0 c18 0 25 -5 25 -20 0 -19 7 -20 90 -20 83 0 90
      1 90 20 0 19 7 20 90 20 83 0 90 -1 90 -20 0 -18 7 -20 60 -20 53 0 60 2 60
      20 0 16 7 20 30 20 23 0 30 -4 30 -20 0 -18 7 -20 60 -20 53 0 60 2 60 20 0
      16 7 20 30 20 23 0 30 -4 30 -20 0 -19 7 -20 90 -20 83 0 90 1 90 20 0 16 7
      20 30 20 23 0 30 -4 30 -20 0 -19 7 -20 95 -20 88 0 95 1 95 20 0 18 7 20 55
      20 48 0 55 -2 55 -20 0 -18 7 -20 65 -20 58 0 65 2 65 20 0 18 7 20 55 20 48
      0 55 -2 55 -20 0 -19 7 -20 95 -20 88 0 95 1 95 20 0 19 7 20 90 20 83 0 90
      -1 90 -20 0 -19 7 -20 90 -20 83 0 90 1 90 20 0 18 7 20 55 20 l55 0 0 130 0
      130 -25 0 c-21 0 -25 -5 -25 -31 l0 -32 -46 7 c-26 3 -53 6 -60 6 -8 0 -14 11
      -14 25 0 21 -5 25 -30 25 -25 0 -30 -4 -30 -24 0 -20 -6 -24 -46 -30 -72 -9
      -74 -9 -74 24 0 28 -3 30 -35 30 -30 0 -35 -3 -35 -24 0 -21 -5 -24 -47 -28
      -45 -4 -134 -4 -210 0 -28 2 -33 6 -33 27 0 22 -4 25 -35 25 -32 0 -35 -3 -35
      -28 l0 -28 -85 0 -85 0 0 28 c0 28 0 28 -65 28 -62 0 -65 -1 -65 -24 0 -21 -6
      -24 -50 -30 -59 -8 -70 -3 -70 30 0 20 -5 24 -30 24 -26 0 -30 -3 -30 -29 l0
      -29 -87 2 -88 1 -3 28 c-3 26 -5 27 -63 27 -59 0 -59 0 -59 -30 l0 -29 -120 2
      -120 1 0 28 c0 24 -4 28 -30 28 -25 0 -30 -4 -30 -24 0 -23 -4 -25 -62 -30
      -35 -2 -102 -4 -150 -4 l-88 1 0 28 c0 24 -4 29 -25 29 l-25 0 0 -130z m170
      40 l0 -30 60 0 60 0 0 30 c0 27 3 30 30 30 29 0 30 -1 30 -50 l0 -50 -74 0
      c-40 0 -94 3 -120 6 l-46 7 0 43 c0 42 1 44 30 44 27 0 30 -3 30 -30z m360 0
      l0 -30 60 0 60 0 0 30 c0 27 3 30 30 30 29 0 30 -1 30 -49 l0 -48 -92 2 c-159
      4 -145 -1 -146 50 0 43 1 45 29 45 26 0 29 -4 29 -30z m360 -15 c0 -43 -1 -45
      -28 -45 -27 0 -29 2 -30 45 0 43 1 45 29 45 28 0 29 -2 29 -45z m300 25 c0
      -16 -7 -20 -30 -20 -25 0 -30 -4 -30 -25 0 -21 -5 -25 -28 -25 -27 0 -29 2
      -30 45 l0 45 59 0 c52 0 59 -2 59 -20z m180 -25 c0 -41 -2 -45 -25 -45 -23 0
      -25 4 -25 45 0 41 2 45 25 45 23 0 25 -4 25 -45z m180 25 c0 -15 -7 -20 -25
      -20 -18 0 -25 5 -25 20 0 15 7 20 25 20 18 0 25 -5 25 -20z m120 -25 c0 -41
      -2 -45 -25 -45 -23 0 -25 4 -25 45 0 41 2 45 25 45 23 0 25 -4 25 -45z m120
      25 c0 -15 -7 -20 -25 -20 -18 0 -25 5 -25 20 0 15 7 20 25 20 18 0 25 -5 25
      -20z m190 -10 c0 -27 3 -30 30 -30 27 0 30 3 30 30 0 27 3 30 30 30 29 0 30
      -1 30 -48 l0 -49 -90 0 -90 0 0 49 c0 47 1 48 30 48 27 0 30 -3 30 -30z m-730
      -50 c0 -15 -7 -20 -25 -20 -18 0 -25 5 -25 20 0 15 7 20 25 20 18 0 25 -5 25
      -20z m-1080 -50 c0 -27 3 -30 30 -30 23 0 30 -4 30 -20 0 -19 -7 -20 -90 -20
      -83 0 -90 1 -90 20 0 16 7 20 30 20 27 0 30 3 30 30 0 27 3 30 30 30 27 0 30
      -3 30 -30z m360 -20 l0 -50 -60 0 c-53 0 -60 2 -60 20 0 16 7 20 30 20 27 0
      30 3 30 30 0 27 3 30 30 30 29 0 30 -1 30 -50z m120 20 c0 -27 3 -30 30 -30
      23 0 30 -4 30 -20 0 -18 -7 -20 -59 -20 l-59 0 0 50 c0 48 1 50 29 50 26 0 29
      -4 29 -30z m240 0 c0 -27 3 -30 30 -30 23 0 30 -4 30 -20 0 -19 -7 -20 -90
      -20 -83 0 -90 1 -90 20 0 16 7 20 30 20 27 0 30 3 30 30 0 27 3 30 30 30 27 0
      30 -3 30 -30z m242 3 c2 -22 9 -29 31 -31 19 -2 27 -9 27 -23 0 -17 -8 -19
      -90 -19 -83 0 -90 1 -90 20 0 16 7 20 30 20 27 0 30 3 30 30 0 27 3 30 29 30
      25 0 30 -4 33 -27z m240 0 c2 -22 9 -29 31 -31 19 -2 27 -9 27 -23 0 -16 -7
      -19 -55 -19 -54 0 -55 0 -55 30 0 27 -3 30 -30 30 -23 0 -30 4 -30 20 0 18 7
      20 54 20 52 0 55 -1 58 -27z m300 0 c2 -22 9 -29 31 -31 19 -2 27 -9 27 -23 0
      -17 -8 -19 -85 -19 -77 0 -85 2 -85 19 0 14 8 21 28 23 21 2 28 9 30 31 3 21
      9 27 27 27 18 0 24 -6 27 -27z m368 -3 c0 -27 3 -30 30 -30 23 0 30 -4 30 -20
      0 -19 -7 -20 -90 -20 -83 0 -90 1 -90 20 0 16 7 20 30 20 27 0 30 3 30 30 0
      27 3 30 30 30 27 0 30 -3 30 -30z"/>
      </g>
    </SvgIcon>
  )
}

const { CONNECT_WALLET, ACCOUNT_CONFIGURED, ACCOUNT_CHANGED, FIXED_FOREX_CLAIM_VECLAIM } = ACTIONS

function WrongNetworkIcon(props) {
  const { className } = props
  return (
    <SvgIcon viewBox="0 0 64 64" strokeWidth="1" className={className}>
      <g strokeWidth="2" transform="translate(0, 0)"><path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M33.994,42.339 C36.327,43.161,38,45.385,38,48c0,3.314-2.686,6-6,6c-2.615,0-4.839-1.673-5.661-4.006" strokeLinejoin="miter"></path> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M47.556,32.444 C43.575,28.462,38.075,26,32,26c-6.075,0-11.575,2.462-15.556,6.444" strokeLinejoin="miter"></path> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M59.224,21.276 C52.256,14.309,42.632,10,32,10c-10.631,0-20.256,4.309-27.224,11.276" strokeLinejoin="miter"></path> <line data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="54" x2="58" y2="6" strokeLinejoin="miter"></line></g>
      </SvgIcon>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid rgba(126,153,176,0.2)',
    marginTop: '10px',
    minWidth: '230px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'none',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#FFF',
      },
    },
  },
}))(MenuItem)

const StyledBadge = withStyles((theme) => ({
  badge: {
    background: '#188926ba',
    color: '#000',
  },
}))(Badge)

function Header(props) {
  const accountStore = stores.accountStore.getStore('account')
  const router = useRouter()

  const [account, setAccount] = useState(accountStore)
  const [darkMode, setDarkMode] = useState(props.theme.palette.type === 'dark' ? true : false)
  const [unlockOpen, setUnlockOpen] = useState(false)
  const [chainInvalid, setChainInvalid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionQueueLength, setTransactionQueueLength] = useState(0)

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account')
      setAccount(accountStore)
      closeUnlock()
    }
    const connectWallet = () => {
      onAddressClicked()
    }
    const accountChanged = () => {
      const invalid = stores.accountStore.getStore('chainInvalid')
      setChainInvalid(invalid)
    }

    const invalid = stores.accountStore.getStore('chainInvalid')
    setChainInvalid(invalid)

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure)
    stores.emitter.on(CONNECT_WALLET, connectWallet)
    stores.emitter.on(ACCOUNT_CHANGED, accountChanged)
    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure)
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet)
      stores.emitter.removeListener(ACCOUNT_CHANGED, accountChanged)
    }
  }, [])

  const handleToggleChange = (event, val) => {
    setDarkMode(val)
    props.changeTheme(val)
  }

  const onAddressClicked = () => {
    setUnlockOpen(true)
  }

  const closeUnlock = () => {
    setUnlockOpen(false)
  }

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode')
    setDarkMode(localStorageDarkMode ? localStorageDarkMode === 'dark' : false)
  }, [])

  const navigate = (url) => {
    router.push(url)
  }

  const callClaim = () => {
    setLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_VECLAIM, content: {} })
  }

  const switchChain = async () => {
    let hexChain = '0x' + Number(process.env.NEXT_PUBLIC_CHAINID).toString(16)
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChain }],
      })
    } catch (switchError) {
      console.log('switch error', switchError)
    }
  }

  const setQueueLength = (length) => {
    setTransactionQueueLength(length)
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <div className={classes.headerContainer}>
        <div className={classes.logoContainer}>
          <a onClick={() => router.push('/home')}><SiteLogo className={classes.appLogo} /></a>
          <Typography className={ classes.version}>version 0.0.33</Typography>
        </div>

        <Navigation changeTheme={props.changeTheme} />

        <div style={{ width: '260px', display: 'flex', justifyContent: 'flex-end' }}>
          {process.env.NEXT_PUBLIC_CHAINID == '4002' && (
            <div className={classes.testnetDisclaimer}>
              <Typography className={classes.testnetDisclaimerText}>Testnet</Typography>
            </div>
          )}

          {transactionQueueLength > 0 && (
            <IconButton
              className={classes.accountButton}
              variant="contained"
              color={props.theme.palette.type === 'dark' ? 'primary' : 'secondary'}
              onClick={() => {
                stores.emitter.emit(ACTIONS.TX_OPEN)
              }}
            >
              <StyledBadge badgeContent={transactionQueueLength} color="secondary" overlap="circular">
                <ListIcon className={classes.iconColor} />
              </StyledBadge>
            </IconButton>
          )}

          {account && account.address ? (
            <div>
              <Button
                disableElevation
                className={classes.accountButton}
                variant="contained"
                color={props.theme.palette.type === 'dark' ? 'primary' : 'secondary'}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
                <Typography className={classes.headBtnTxt}>
                  {account && account.address ? formatAddress(account.address) : 'Connect Wallet'}
                </Typography>
                <ArrowDropDownIcon className={classes.ddIcon} />
              </Button>

              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.userMenu}
              >
                <StyledMenuItem className={classes.hidden} onClick={() => router.push('/dashboard')}>
                  <ListItemIcon className={classes.userMenuIcon}>
                    <DashboardOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText className={classes.userMenuText} primary="Dashboard" />
                </StyledMenuItem>
                <StyledMenuItem onClick={onAddressClicked}>
                  <ListItemIcon className={classes.userMenuIcon}>
                    <AccountBalanceWalletOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText className={classes.userMenuText} primary="Switch Wallet Provider" />
                </StyledMenuItem>
              </StyledMenu>
            </div>
          ) : (
            <Button
              disableElevation
              className={classes.accountButton}
              variant="contained"
              color={props.theme.palette.type === 'dark' ? 'primary' : 'secondary'}
              onClick={onAddressClicked}
            >
              {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
              <Typography className={classes.headBtnTxt}>
                {account && account.address ? formatAddress(account.address) : 'Connect Wallet'}
              </Typography>
            </Button>
          )}
        </div>
        {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closeUnlock} />}
        <TransactionQueue setQueueLength={setQueueLength} />
      </div>
      {chainInvalid ? (
        <div className={classes.chainInvalidError}>
          <div className={classes.ErrorContent}>
            <WrongNetworkIcon className={classes.networkIcon} />
            <Typography className={classes.ErrorTxt}>
              The chain you are connected to is not supported. Please check that your wallet is connected to Avalanche
              Mainnet.
            </Typography>
            <Button className={classes.switchNetworkBtn} variant="contained" onClick={() => switchChain()}>
              Switch to {process.env.NEXT_PUBLIC_CHAINID == '4002' ? 'Fantom Testnet' : 'Avalanche Mainnet'}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default withTheme(Header)

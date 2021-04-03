import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Staking from './Staking'
import Dashboard from './Dashboard'
import Vote from './Vote'
import Header from './components/Header'
import Web3 from 'web3'
import Config from './utils/config'
import './App.scss'
import Footer from './components/Footer'
import { useTranslation } from 'react-i18next'
import { LanguageContext, WalletAddressContext, NetworkTypeContext, Web3Context, ReadonlyWeb3Context } from './context'
import logger from './utils/logger'
import detectEthereumProvider from '@metamask/detect-provider'

const AboutUs = lazy(() => import('./pages/aboutUs')) // 关于我们

function App() {
    const [connectedAddress, setConnectedAddress] = useState()
    const [networkType, setNetworkType] = useState()
    const [web3, setWeb3] = useState()
    const [readonlyWeb3, setReadonlyWeb3] = useState()
    const [language, setLanguage] = useState('en')
    const { t } = useTranslation()

    useEffect(() => {
        async function initialConnect() {
            await updateMetamaskConnection()

            if (window.ethereum) {
                window.ethereum.on('chainChanged', handleChainChanged)
                window.ethereum.on('accountsChanged', handleAccountsChanged)
                window.ethereum.on('networkChanged', handleNetworkChanged)
            }
        }

        initialConnect()

    }, [])

    const handleChainChanged = (_chainId) => {
        window.location.reload()
    }

    const handleAccountsChanged = (accounts) => {
        if (!accounts || accounts.length === 0) {
            logger.info('Please connect to MetaMask.')
            setConnectedAddress(undefined)
        } else if (accounts[0] !== connectedAddress) {
            setConnectedAddress(accounts[0])
        }
    }

    const handleNetworkChanged = (networkId) => {
        const networkType = Config.chainIdMap[networkId]
        if(networkType) {
            setNetworkType(networkType)
        } else {
            setNetworkType(t('App.Unsupported'))
        }
    }

    const handleEthereum = async () => {
        const { ethereum } = window

        if (!ethereum) return

        try {
            const [ accounts, networkId ] = await Promise.all([
                ethereum.request({ method: 'eth_accounts' }),
                ethereum.request({ method: 'eth_chainId' })
            ])
            handleNetworkChanged(Number(networkId))
            let viewAccount = window.location.hash.substr(1)
            if (window.web3.utils.isAddress(viewAccount)) {
                accounts[0] = viewAccount
            }
            handleAccountsChanged(accounts)
        } catch(err) {
            logger.error('handleEthereum error:', err)
            const accounts = await ethereum.enable()
            handleAccountsChanged(accounts)
            // setConnectedAddress('0x8d14592bfaC956eaa81919A21652045F846056Db')
        }
    }

    const updateMetamaskConnection = async() => {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            if (!window.ethereum) {
                window.web3 = new Web3(new Web3.providers.HttpProvider('https://heconode.ifoobar.com'))
            } else {
                window.web3 = new Web3(window.ethereum)
            }
        }

        setWeb3(window.web3)

        window.readonlyWeb3 = new Web3(window.web3.currentProvider)
        setReadonlyWeb3(window.readonlyWeb3)

        const provider = await detectEthereumProvider({silent: true, timeout: 5000})
        if (provider) {
            await handleEthereum()
        } else {
            handleNetworkChanged(128)
            handleAccountsChanged(['0x0000000000000000000000000000000000000000'])
        }
    }

    return (
        <Web3Context.Provider value={{web3}}>
            <ReadonlyWeb3Context.Provider value={{readonlyWeb3}}>
                <NetworkTypeContext.Provider value={{networkType}}>
                    <WalletAddressContext.Provider value={{connectedAddress}}>
                        <LanguageContext.Provider value={{language, setLanguage}}>
                            <BrowserRouter>
                                <Header />
                                <Switch className="appContent">
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route exact path="/staking">
                                        <Staking />
                                    </Route>
                                     <Route exact path="/dashboard">
                                        <Dashboard />
                                    </Route>
                                    <Route exact path="/Vote">
                                        <Vote />
                                    </Route>
                                    <Suspense fallback={<div>loading</div>}>
                                        <Route exact path="/aboutus_demo">
                                            <AboutUs />
                                        </Route>
                                    </Suspense>
                                </Switch>
                                <Footer />
                            </BrowserRouter>
                        </LanguageContext.Provider>
                    </WalletAddressContext.Provider>
                </NetworkTypeContext.Provider>
            </ReadonlyWeb3Context.Provider>
        </Web3Context.Provider>
    )
}

export default App

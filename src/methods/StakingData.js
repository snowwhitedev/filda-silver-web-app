import Config from '../utils/config'
import moment from 'moment'
import filda from '../assets/images/markets/filda.svg'
import fela from '../assets/images/markets/fela.svg'
import fhusd from '../assets/images/markets/fhusd.svg'
import fclc from '../assets/images/markets/fclc.svg'
import ht from '../assets/images/markets/ht.svg'
import fht from '../assets/images/markets/filda-ht.png'
import mdxfilda from '../assets/images/markets/filda-mdx.png'
import BigNumber from 'bignumber.js'
import CoreData from './CoreData'
import FetchData from './FetchData'
import log from '../utils/logger'

const getLogo = (tokenSymbol) => {
    switch (tokenSymbol) {
        case "FELA":
            return fela

        case "FHUSD":
            return fhusd

        case "FCLC":
            return fclc

        case "FHT":
            return fht

        case "HT":
            return ht

        case "MDXFILDA":
            return mdxfilda

        default:
            return filda
    }
}

const getPoolList = () => {
    return Object.keys(Config.pools).map(k => ({ 'address': k })).reverse()
}

const getPoolInfo = async(web3, networkType, connectedAddress, poolAddress) => {
    const noMintRewardPoolABI = Config.noMintRewardPool.ABI
    const erc20ABI = Config.erc20.ABI
    const poolInfo = { address: poolAddress }

    const noMintRewardPoolContract = await new web3.eth.Contract(noMintRewardPoolABI, poolAddress)
    poolInfo.name = await noMintRewardPoolContract.methods.name().call()

    if (Config.pools[poolAddress].lpTokenId === 'FilDA-Airdrop') {
        poolInfo.rewardTokenName = 'FilDA'
        poolInfo.rewardTokenSymbol = 'FilDA'
        poolInfo.lpTokenSymbol = 'FilDA'
        const defaultLogo = getLogo('default')
        poolInfo.rewardTokenLogo = defaultLogo
        poolInfo.lpTokenLogo = defaultLogo
        const [ redpacketBalance, totalRedpacket, rewardTokenTokenAddress ] = await Promise.all([
            noMintRewardPoolContract.methods.earned(connectedAddress).call(),
            noMintRewardPoolContract.methods.totalSupply().call(),
            noMintRewardPoolContract.methods.rewardToken().call()
        ])
        poolInfo.redpacketBalance = redpacketBalance
        poolInfo.redpacketBalanceFormatted = (poolInfo.redpacketBalance / Math.pow(10, 18))
        poolInfo.rewardsBalance = poolInfo.redpacketBalance
        poolInfo.rewardsBalanceFormatted = poolInfo.redpacketBalanceFormatted
        poolInfo.totalRedpacket = totalRedpacket / Math.pow(10, 18)

        const [ rewardTokenTokenContract, totalRedpacketLeft, periodFinish, rewardsRedeemed ] = await Promise.all([
            new web3.eth.Contract(erc20ABI, rewardTokenTokenAddress),
            poolInfo.rewardTokenTokenContract.methods.balanceOf(poolAddress).call(),
            noMintRewardPoolContract.methods.periodFinish().call(),
            noMintRewardPoolContract.methods.rewards(connectedAddress).call()
        ])
        poolInfo.rewardTokenTokenContract = rewardTokenTokenContract
        poolInfo.totalRedpacketLeft = totalRedpacketLeft / Math.pow(10, 18)
        poolInfo.withdrawPeriod = 0

        const now = Math.round((new Date()).getTime() / 1000)
        poolInfo.redpacketActive = periodFinish > now

        // poolInfo.rewardAPR = 0
        poolInfo.rewardsRedeemed = rewardsRedeemed / Math.pow(10, 18)

        return poolInfo
    }

    if (Config.pools[poolAddress].lpTokenName === 'HT') {
        poolInfo.rewardTokenName = 'HT'
        poolInfo.rewardTokenSymbol = 'HT'
        poolInfo.lpTokenSymbol = 'HT'
        poolInfo.rewardTokenLogo = getLogo('HT')
        poolInfo.lpTokenLogo = getLogo('')
        const [ rewardsBalance, totalRewards, totalRewardsLeft, periodFinish, currentSnapshotId, daoPoolContract ] =
            await Promise.all([
                noMintRewardPoolContract.methods.earned(connectedAddress).call(),
                noMintRewardPoolContract.methods.totalSupply().call(),
                web3.eth.getBalance(poolAddress),
                noMintRewardPoolContract.methods.periodFinish().call(),
                noMintRewardPoolContract.methods.currentSnapshotId().call(),
                new web3.eth.Contract(noMintRewardPoolABI, '0x73CB0A55Be009B30e63aD5830c85813414c66367')
            ])

        poolInfo.rewardsBalance = rewardsBalance
        poolInfo.rewardsBalanceFormatted = (poolInfo.rewardsBalance / Math.pow(10, 18))
        poolInfo.totalRewards = totalRewards
        poolInfo.totalRewards = poolInfo.totalRewards / Math.pow(10, 18)
        poolInfo.totalRewardsLeft = totalRewardsLeft
        poolInfo.totalRewardsLeft = poolInfo.totalRewardsLeft / Math.pow(10, 18)
        poolInfo.withdrawPeriod = 0

        let now = Math.round((new Date()).getTime() / 1000)
        poolInfo.rewardsActive = periodFinish > now

        const htFildaLp = '0x55542f696a3fecae1c937bd2e777b130587cfd2d'
        const uniswapContractABI = Config.uniswapPair.ABI

        let [ daoPoolFildaAmount, userBalance, uniswapContract ] = await Promise.all([
            daoPoolContract.methods.totalSupplyAt(currentSnapshotId).call(),
            daoPoolContract.methods.balanceOfAt(connectedAddress, currentSnapshotId).call(),
            new web3.eth.Contract(uniswapContractABI, htFildaLp)
        ])

        const reserves = await uniswapContract.methods.getReserves().call()
        const fildaAmount = reserves.reserve1
        const htAmount = reserves.reserve0
        const htPrice = fildaAmount / htAmount
        const htRewards = poolInfo.totalRewards
        daoPoolFildaAmount = daoPoolFildaAmount / Math.pow(10, 18)
        userBalance = userBalance / Math.pow(10, 18)
        let userRewards = poolInfo.totalRewards * userBalance / daoPoolFildaAmount
        const rewardsApy = htPrice * htRewards * 52 * 100 / daoPoolFildaAmount
        poolInfo.rewardAPR = rewardsApy.toFixed(4)
        poolInfo.rewardsRedeemed = userRewards - poolInfo.rewardsBalanceFormatted
        if (!poolInfo.rewardsActive) {
            poolInfo.rewardsRedeemed = 0
            poolInfo.rewardAPR = 0
        }
        if (poolInfo.rewardsRedeemed < 0.000000001) poolInfo.rewardsRedeemed = 0
        return poolInfo
    }

    //fetching LP Token Info
    poolInfo.lpTokenAddress = await noMintRewardPoolContract.methods.lpToken().call()
    poolInfo.lpTokenContract = await new web3.eth.Contract(erc20ABI, poolInfo.lpTokenAddress)

    poolInfo.lpTokenName = Config.pools[poolAddress].lpTokenName
    poolInfo.lpTokenSymbol = Config.pools[poolAddress].lpTokenSymbol
    poolInfo.lpTokenId = Config.pools[poolAddress].lpTokenId
    poolInfo.disabled = !!Config.pools[poolAddress].disabled
    poolInfo.hasLockPeriod = Config.pools[poolAddress].hasLockPeriod
    if (poolInfo.lpTokenName !== 'FilDA') poolInfo.name = poolInfo.lpTokenName

    //Important: We are reading the lpTokenName and lpTokenSymbol from hard coded values from config file.
    // The following code will make them read from the pool manager
    // poolInfo.lpTokenNameFromContract = await poolInfo.lpTokenContract.methods.name().call()
    // poolInfo.lpTokenSymbolFromContract = await poolInfo.lpTokenContract.methods.symbol().call()

    poolInfo.lpTokenLogo = getLogo(poolInfo.lpTokenId)

    const [ lpTokendecimals, lpTokenStakedTotalSupply, lpTokenStakedBalance, lpTokenWalletBalance, allowance, periodFinish, fildaPrice ] =
        await Promise.all([
            poolInfo.lpTokenContract.methods.decimals().call(),
            noMintRewardPoolContract.methods.totalSupply().call(),
            noMintRewardPoolContract.methods.balanceOf(connectedAddress).call(),
            poolInfo.lpTokenContract.methods.balanceOf(connectedAddress).call(),
            poolInfo.lpTokenContract.methods.allowance(connectedAddress, poolAddress).call(),
            noMintRewardPoolContract.methods.periodFinish().call(),
            FetchData.getFildaPrice(web3, networkType)
        ])

    poolInfo.lpTokendecimals = lpTokendecimals
    poolInfo.lpTokenStakedTotalSupply = lpTokenStakedTotalSupply
    poolInfo.lpTokenStakedTotalSupplyFormatted = poolInfo.lpTokenStakedTotalSupply / Math.pow(10, parseInt(lpTokendecimals))
    poolInfo.lpTokenStakedBalance = lpTokenStakedBalance
    poolInfo.lpTokenStakedBalanceFormatted = (lpTokenStakedBalance / Math.pow(10, parseInt(lpTokendecimals)))
    poolInfo.lpTokenWalletBalance = lpTokenWalletBalance
    poolInfo.lpTokenWalletBalanceFormatted = (poolInfo.lpTokenWalletBalance / Math.pow(10, parseInt(lpTokendecimals)))

    let poolAmount
    if (poolInfo.lpTokenName.toLowerCase() === poolInfo.lpTokenId.toLowerCase()) {
        poolAmount = poolInfo.lpTokenStakedTotalSupplyFormatted
    } else {
        const uniswapContractABI = Config.uniswapPair.ABI
        const uniswapContract = new web3.eth.Contract(uniswapContractABI, poolInfo.lpTokenAddress)

        const [ reserves, totalSupply ] = await Promise.all([
            uniswapContract.methods.getReserves().call(),
            poolInfo.lpTokenContract.methods.totalSupply().call()
        ])
        const totalLpToken = reserves.reserve1 * 2/Math.pow(10, lpTokendecimals)
        poolAmount = totalLpToken * poolInfo.lpTokenStakedTotalSupply / totalSupply
    }

    poolInfo.lpTokenApproved = Number(allowance) !== 0

    let now = Math.round((new Date()).getTime() / 1000)
    //fetching rewards token info
    let rewardRate = 0
    if (periodFinish > now) {
        rewardRate = await noMintRewardPoolContract.methods.rewardRate().call()
    }

    let rewardRatioPerDay = 0
    if (poolAmount > 0) rewardRatioPerDay = rewardRate * 3600 * 24 / Math.pow(10, 18) / poolAmount
    const rewardRatioPerYear = rewardRatioPerDay * 365
    poolInfo.rewardAPR = rewardRatioPerYear * 100
    poolInfo.rewardAPR = poolInfo.rewardAPR.toFixed(2)
    poolInfo.rewardAPY = rewardRatioPerDay !== 0 ? Math.pow(rewardRatioPerDay + 1, 365) * 100 : 0
    poolInfo.rewardAPY = poolInfo.rewardAPY.toFixed(2)
    poolInfo.poolAmountInUsd = poolAmount * fildaPrice
    poolInfo.poolAmountInUsd = poolInfo.poolAmountInUsd.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    poolInfo.rewardTokenAddress = await noMintRewardPoolContract.methods.rewardToken().call()
    poolInfo.rewardTokenContract = await new web3.eth.Contract(erc20ABI, poolInfo.rewardTokenAddress)
    const [ rewardTokenName, rewardTokenSymbol, rewardDecimals, rewardsEarnedBalance, adminAddress, withdrawPeriod ] =
        await Promise.all([
            poolInfo.rewardTokenContract.methods.name().call(),
            poolInfo.rewardTokenContract.methods.symbol().call(),
            poolInfo.rewardTokenContract.methods.decimals().call(),
            noMintRewardPoolContract.methods.earned(connectedAddress).call(),
            noMintRewardPoolContract.methods.governance().call(),
            noMintRewardPoolContract.methods.withdrawPeriod().call()
        ])
    poolInfo.rewardTokenName = rewardTokenName
    poolInfo.rewardTokenSymbol = rewardTokenSymbol
    poolInfo.rewardTokenLogo = getLogo(poolInfo.rewardTokenName)
    poolInfo.rewardsEarnedBalance = rewardsEarnedBalance
    poolInfo.rewardsEarnedBalanceFormatted = (poolInfo.rewardsEarnedBalance / Math.pow(10, parseInt(rewardDecimals)))

    poolInfo.adminAddress = adminAddress
    poolInfo.stakeActive = periodFinish > now
    poolInfo.withdrawPeriod = parseInt(withdrawPeriod)

    //hardcoding the pooladdress to skip the pool that was wrongly deployed
    if(Number(poolInfo.withdrawPeriod) !== 0) {
        const [ withdrawTime, lockedBalance ] = await Promise.all([
            noMintRewardPoolContract.methods.withdrawTime().call({from: connectedAddress}),
            noMintRewardPoolContract.methods.lockedBalance().call({from: connectedAddress})
        ])
        poolInfo.withdrawTime = withdrawTime
        poolInfo.withdrawWaitTime = parseInt(poolInfo.withdrawTime) - moment().unix()
        poolInfo.lockedBalance = lockedBalance
        poolInfo.lockedBalanceFormatted = (poolInfo.lockedBalance / Math.pow(10, parseInt(lpTokendecimals)))
    }

    //log.info(poolInfo.name, poolInfo.lpTokenStakedBalance)
    return poolInfo
}

const gasLimit = 500000

const approveERC20 = async(web3, connectedAddress, networkType, tokenAddress, spendAddress) => {

    const erc20ABI = Config.erc20.ABI
    let contract = await new web3.eth.Contract(erc20ABI, tokenAddress);

    const maxApproval = BigNumber(2).pow(256).minus(1).toFixed(0);

    const gasPrice = await web3.eth.getGasPrice()

    log.info(`Initiating approval: ${spendAddress} ${tokenAddress} ${maxApproval}`)
    return await contract.methods.approve(spendAddress, maxApproval.toString()).send({
        from: connectedAddress,
        gasLimit: web3.utils.toHex(gasLimit),     // posted at compound.finance/developers#gas-costs
        gasPrice: web3.utils.toHex(gasPrice) // use ethgasstation.info (mainnet only)
    })
}

const getPoolContract = async(web3, networkType, poolAddress) => {
    const noMintRewardPoolABI = Config.noMintRewardPool.ABI;
    const erc20ABI = Config.erc20.ABI
    let noMintRewardPoolContract = await new web3.eth.Contract(noMintRewardPoolABI, poolAddress)
    return noMintRewardPoolContract
}

const getRawValue = async (web3, networkType, tokenContract, tokenSymbol, value)  => {
    let decimals = 18
    if (!CoreData.isNativeToken(tokenSymbol)) {
        decimals = await tokenContract.methods.decimals().call()
    }

    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN})
    const rawValue = BigNumber(value).multipliedBy(BigNumber(10).pow(parseInt(decimals))).toFixed(0)
    return rawValue
}

export default {
    getPoolList: getPoolList,
    getPoolInfo: getPoolInfo,
    approveERC20: approveERC20,
    getPoolContract: getPoolContract,
    getRawValue: getRawValue
}

import React, {useContext, useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import LoadingIcon from '../../assets/images/savingsloading.svg'
import { useTranslation } from 'react-i18next'
import CheckIcon from '../../assets/images/check.svg'
import ErrorIcon from '../../assets/images/error.svg'
import CoreData from '../../methods/CoreData'
import log from '../../utils/logger'
import BigNumber from 'bignumber.js'
import { NetworkTypeContext, WalletAddressContext, Web3Context } from '../../context'

export default function WithdrawModal(props) {
    const { connectedAddress } = useContext(WalletAddressContext)
    const { networkType } = useContext(NetworkTypeContext)
    const { web3 } = useContext(Web3Context)

    const styles = props.styles;
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [withdrawSafeMax, setWithdrawSafeMax] = useState(true)
    const [lowBalance, setLowBalance] = useState(false)
    const [rateExceed85, setRateExceed85] = useState(false)
    const [withdrawCompleted, setWithdrawCompleted] = useState(false)
    const [withdrawFailed, setWithdrawFailed] = useState(false)
    const [txnHash, setTxnHash] = useState('')

    let withdrawSafeMaxAmount = new BigNumber(props.accountLiquidityInFiat).div(props.data.collateralFactor)
        .div(props.data.price).times(0.85).toString(10)
    const savingsBalanceFormatted = new BigNumber(props.data.savingsBalanceFormatted)
    const totalLoanBalance = new BigNumber(props.totalLoanBalance)
    if (savingsBalanceFormatted.lt(withdrawSafeMaxAmount)
        || totalLoanBalance.eq(0) || props.data.isAssetMember === false) {
        withdrawSafeMaxAmount = savingsBalanceFormatted.toString(10)
    }

    const getPercent = (value = inputValue) => {
        let updatedTotalBorrowLimit = new BigNumber(props.totalBorrowLimitFiat)
        .minus(new BigNumber(CoreData.fixedNaN(parseFloat(value))).times(props.data.price))
        const loanUsedPercent = totalLoanBalance.div(updatedTotalBorrowLimit).times(100)
        let loanUsedPercentFixed2 = loanUsedPercent.toFixed(2)
        if (!new BigNumber(loanUsedPercentFixed2).isFinite()) {
            loanUsedPercentFixed2 = '0'
        }
        return loanUsedPercentFixed2
    }

    const validateInput = async(value) => {
        setInputValue(value)
        const txnValue = await getRawValue(CoreData.fixedNaN(parseFloat(value)))
        const isLowBalance = (parseFloat(props.data.savingsBalance) < parseFloat(txnValue)) || (parseFloat(withdrawSafeMaxAmount) < parseFloat(value))

        if (isLowBalance) {
            setLowBalance(true)
            setRateExceed85(false)
        } else if(Number(getPercent(value)) >= 85){
            setLowBalance(false)
            setRateExceed85(true)
        } else {
            setLowBalance(false)
            setRateExceed85(false)
        }
    }

    const getRawValue = async(value) => {
        return CoreData.getRawValue(web3, networkType, props.data.symbol, value)
    }

    const handleClose = async() => {
        setInputValue('')
        setLoading(false)
        setWithdrawSafeMax(true)
        setLowBalance(false)
        setRateExceed85(false)
        setWithdrawCompleted(false)
        setWithdrawFailed(false)
        setTxnHash('')
        props.handleClose()
    }

    const handleWithdraw = async(max) => {
        setLoading(true)
        const withdrawAmount = max ? withdrawSafeMaxAmount : inputValue
        const contract = await CoreData.getQTokenContract(web3, networkType, props.data.symbol)
        const gasInfo = await CoreData.getGasInfo(web3)
        let rawWithdrawAmount
        let redeemFunction = contract.methods.redeemUnderlying
        if (`${withdrawAmount}` === savingsBalanceFormatted.toString(10)) {
            rawWithdrawAmount = props.data.savingsCTokenBalance
            redeemFunction = contract.methods.redeem
        } else {
            rawWithdrawAmount = await getRawValue(withdrawAmount)
        }

        let estimatedGas = await redeemFunction(web3.utils.toBN(rawWithdrawAmount)).estimateGas();
        estimatedGas = estimatedGas * 5

        await redeemFunction(web3.utils.toBN(rawWithdrawAmount)).send({
            from: connectedAddress,
            gasLimit: estimatedGas,      // posted at compound.finance/developers#gas-costs
            gasPrice: web3.utils.toHex(gasInfo.gasPrice) // use ethgasstation.info (mainnet only)
        })
        .on('transactionHash', function(hash) {
            log.info(hash)
            props.data.withdrawTxnHash = hash
            setTxnHash(hash) // we use this only for the modal's state
        })
        .then(response => {
            log.info(response)
            if(response.events.Failure) {
                setWithdrawFailed(true)
            } else {
                setWithdrawCompleted(true)
            }
            props.data.withdrawTxnHash = null
            setLoading(false)
        })
        .catch(error => {
            log.error(error)
            if(error.code === 4001) {
                handleClose()
            } else {
                setWithdrawFailed(true)
                props.data.withdrawTxnHash = null
            }
        })
    }


    //UI Rendering

    const WithdrawButton =
        (lowBalance || isNaN(parseFloat(inputValue)) || parseFloat(inputValue) <= 0 || Number(inputValue) > Number(withdrawSafeMaxAmount) )?
            <Button variant="savings" disabled>{t('Common.Withdraw')}</Button> :
            <Button variant="savings" onClick={() => handleWithdraw(false)}>{t('Common.Withdraw')}</Button>


    const ModalLoading =
        <div>
            <Modal.Body>
                <div className={styles.loadingContainer}>
                    <img
                        src={LoadingIcon}
                        width="auto"
                        height="60px"
                        className="d-inline-block align-top"
                        alt="loading"
                        />
                    {
                        props.data.withdrawTxnHash == null ? '' :
                        <a style={{ color: '#4FDAB8' }} href={CoreData.getExplorerUrl(txnHash, networkType)} target="_blank">{t('Common.ViewTxnOnExplorer')}</a>
                    }
                </div>
            </Modal.Body>
        </div>


    const ModalWithdrawForm = withdrawSafeMax ?
            <div>
                <Modal.Body>
                    <div className={styles.repayInFullContainer}>
                <Button variant="loans" onClick={() => handleWithdraw(true)}>{t('WithdrawModal.WithdrawSafeMax')}</Button>
                        <Button variant="cancel" onClick={() => setWithdrawSafeMax(false)}>{t('WithdrawModal.WithdrawCustomAmount')}</Button>
                    </div>
                </Modal.Body>
                <div className={styles.footerInfo}>
                <div>{t('WithdrawModal.WithdrawSafeMax')}</div>
                    <div className={styles.tokenBalance}>
                        {new BigNumber(withdrawSafeMaxAmount).toFixed(2, 1) + ' ' + props.data.symbol}
                    </div>
                </div>
            </div> :
            <div>
                <Modal.Body>
                    <Form >
                        <Form.Group controlId="formDeposit">
                        <Form.Control
                            className={styles.txnValue}
                            type="number"
                            placeholder={"0.00 " + props.data.symbol}
                            autoComplete="off"
                            value={inputValue}
                            onChange={e => validateInput(e.target.value)} />
                        </Form.Group>
                    </Form>
                    {!lowBalance && rateExceed85 && (
                        <div className={styles.infoText}>
                            <img
                                src={ErrorIcon}
                                width="auto"
                                height="20"
                                className="d-inline-block align-middle"
                                alt="error"
                            />
                            <span className={styles.rateExceed85Tips}>{t('WithdrawModal.rateExceed85Tips')}</span>
                        </div>
                    )}
                    {lowBalance ? <div className={styles.txnError}>{t('WithdrawModal.InsufficientBalance')}</div> : ''}
                </Modal.Body>
                <Modal.Footer>
                    {WithdrawButton}
                <Button variant="cancel" onClick={handleClose}>{t('Common.Cancel')}</Button>
                </Modal.Footer>
                <div className={styles.footerInfo}>
                    <div>{t('WithdrawModal.WithdrawSafeMax')}</div>
                    <div className={styles.tokenBalance}>
                        {new BigNumber(withdrawSafeMaxAmount).toFixed(2, 1) + ' ' + props.data.symbol}
                    </div>
                </div>
                <div className={styles.loanLimitBarOuter}>
                    <div className={lowBalance ? styles.loanLimitExceedBarInner : styles.loanLimitBarInner} style={{'width': getPercent() + '%'}} />
                </div>
                <div className={styles.infoText}>{t('WithdrawModal.InfoText')}</div>
            </div>

    const TxnSuccessMsg =
        <div>
            <Modal.Body>
                <div className={styles.loadingContainer}>
                    <img
                        src={CheckIcon}
                        width="auto"
                        height="60px"
                        className="d-inline-block align-top"
                        alt="error"
                        />
                </div>
                <div className={styles.approvalMsg}>{t('WithdrawModal.SuccessMsg')}</div>
                <a href={CoreData.getExplorerUrl(txnHash, networkType)} target="_blank">{t('Common.ViewTxnOnExplorer')}</a>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="cancel" onClick={handleClose}>{t('Common.Close')}</Button>
            </Modal.Footer>
        </div>

    const TxnErrorMsg =
        <div>
            <Modal.Body>
                <div className={styles.loadingContainer}>
                    <img
                        src={ErrorIcon}
                        width="auto"
                        height="60px"
                        className="d-inline-block align-top"
                        alt="error"
                        />
                </div>
                <div className={styles.approvalMsg}>{t('WithdrawModal.ErrorMsg')}</div>
                <a href={CoreData.getExplorerUrl(txnHash, networkType)} target="_blank">{t('Common.ViewTxnOnExplorer')}</a>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="cancel" onClick={handleClose}>{t('Common.Close')}</Button>
            </Modal.Footer>
        </div>


    const ModalRendered = loading ? ModalLoading : ModalWithdrawForm


    return(
        <Modal
            show={props.show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            className={styles.txnModal}
            centered
            animation={false}>
            <Modal.Header closeButton>
                <img
                    src={props.data.logo}
                    width="auto"
                    height="36px"
                    className="d-inline-block align-top"
                    alt="QuickSilver Logo"
                    />
                <div className={styles.assetName}>{props.data.name}</div>
                {
                withdrawCompleted || withdrawFailed ? '' : <div className={styles.txnTypeDesc}>
                    {t('Common.WithdrawAssets')}
                </div>
                }
            </Modal.Header>
            {
                withdrawCompleted ? TxnSuccessMsg :
                withdrawFailed ? TxnErrorMsg : ModalRendered
            }
        </Modal>
    )
}

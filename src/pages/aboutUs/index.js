import React, {useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import classNames from 'classnames'
import { FaGithub, FaWeixin, FaTwitter, FaTelegramPlane, FaRedditAlien } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import {faqData} from './data'
import styles from './index.module.scss'


const AboutUs = () => {
  const { t } = useTranslation()
  const [faqValue, setFaqValue] = useState(faqData)

  const whatIsFilDA = () => {
    return (
      <section className={classNames(styles.sec, styles.whatIsFilDA)}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2 className={styles.mainTitle}>{t('AboutUs.WhatIsFilDA')}</h2>
            <div className={styles.infoList}>
              <p>FilDA, at its core, is a highly secure decentralized banking platform containing two fundamentalprotocols:</p>
              <ul>
                <li>Banking - Lending and Borrowing assets (based on Compound)</li>
                <li>Staking - Locking of assets to earn rewards (based on Harvest</li>
              </ul>
              <p>These two protocols allow users to:</p>
              <ul>
                <li>Deposit: Deposit crypto-assets to earn interest (dynamic rates)</li>
                <li>Borrow: Borrow a variety of crypto assets with no fixed terms</li>
                <li>Stake: Stake crypto pairs in liquidity pools to earn rewards (in FiLDA)</li>
              </ul>
            </div>
            <div className={styles.info}>
              <p>Running on the Huobi ECO Chain (HECO) provides a safe and secure environment, with fast transactions and low fees. HECO is a space for users to participate in the DeFi experience, while at the same time, combats many of the performance and cost issues faced by competing platforms. 
              </p>
              <p>Interest rates for reward accumulation are determined algorithmically by supply and demand. Furthermore, if rewards are compounded, users can benefit from asset growth significantly beyond that which is available in traditional banking. A new paradigm is here.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const roadMap = () => {
    return (
      <section className={classNames(styles.sec, styles.roadMap)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>FilDA Roadmap</h2>
          <div className={styles.road_list}>
            <div className={styles.road_line}></div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-01-05</em>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  FilDA 上线
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-01-12</em>
                    <span>类型：矿池 项目：火币矿池</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>HPT加入FilDA借贷区</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-01-14</em>
                    <span>类型：机枪池 项目：EarnDeFi</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>战略合作</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-01-19</em>
                    <span>类型：交易所 项目：ZG.COM</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>上线FilDA</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-01-28</em>
                    <span>类型：交易所 项目：BiKi</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>上线FilDA并开启流动性挖矿</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-01-28</em>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>入选火币Heco金牌造物主</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-02-03</em>
                    <span>类型：保险 项目：ins3.finance</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>去中心化保险项目ins3.finance上线FilDA本金保证险</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
                <div className={styles.road_item_content}>
                  <div className={styles.road_circle}></div>
                  <div className={styles.road_item_hd}>
                    <div className={styles.picShadow}></div>
                    <div className={styles.pic}></div>
                    <div className={styles.h}>
                      <em>2020-02-06</em>
                      <span>类型：DEX 项目：MDEX</span>
                    </div>
                  </div>
                  <div className={styles.road_item_bd}>
                    <p>开启FilDA-MDX、FilDA-HT、FilDA-HUSD、FilDA-ELA交易对流动性挖矿</p>
                    <p>生态基金扶持(2.14宣布)</p>
                    <p>上线MDX借贷（3.9宣布）</p>
                  </div>
                </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-02-08</em>
                    <span>类型：交易所 项目：MXC</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>上线FilDA</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-02-08</em>
                    <span>类型：公链 项目：NEO</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>NEO跨链资产借贷, Polynetwork首发跨链资产借贷</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-02-13</em>
                    <span>类型：DeFi 项目：StarLink</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>开通FILDA无损挖矿</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-02-14</em>
                    <span>类型：DEX 项目：LAVAswap</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>上线FILDA/LAVA&FILDA/USDT两个流动性矿池</p>
                  <p>FilDA上线LAVAswap质押挖矿池（3.19宣布）</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
                <div className={styles.road_item_content}>
                  <div className={styles.road_circle}></div>
                  <div className={styles.road_item_hd}>
                    <div className={styles.picShadow}></div>
                    <div className={styles.pic}></div>
                    <div className={styles.h}>
                      <em>2020-02-15</em>
                      <span>类型：DeFi 项目：HecoFI</span>
                    </div>
                  </div>
                  <div className={styles.road_item_bd}>
                    <ul>
                      <li>HecoFI与FilDA合作升级共同收益分配策略，HecoFIFilDA挖矿产出将以FilDA代币形式分配给HFI用户，未来双方共同将平台部分收益用于双方社区建设。</li>
                      <li>HecoFI机枪池在FilDA平台获得的FilDA挖矿收益将提取一定比例（后期择机提高）对FilDALP流动池提供者以及DAO治理参与者进行空投。</li>
                      <li>HecoFI质押池将支持FilDA-HFI交易对挖矿。</li>
                    </ul>
                  </div>
                </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-02-25</em>
                    <span>类型：算法稳定币 项目：Supernova</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>达成战略合作，开启FilDA无损挖矿，并将开启sFILDA创世挖矿</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-03-12</em>
                    <span>类型：DeFi 项目：Depth</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>上线FilDA稳定币池</p>
                </div>
              </div>
            </div>
            <div className={styles.road_item}>
              <div className={styles.road_item_content}>
                <div className={styles.road_circle}></div>
                <div className={styles.road_item_hd}>
                  <div className={styles.picShadow}></div>
                  <div className={styles.pic}></div>
                  <div className={styles.h}>
                    <em>2020-03-23</em>
                    <span>类型：预言机 项目：Chainlink</span>
                  </div>
                </div>
                <div className={styles.road_item_bd}>
                  <p>FilDA将在其借贷产品中接入Chainlink的预言机服务</p>
                </div>
              </div>
            </div>
          </div>
          {/* wallet */}
          {/* <div className={styles.wallet}>
            <img src={require('../../images/aboutUs/wallet.png')} />
            <h3 className={styles.subTitle}>Wallet</h3>
            <div className={styles.wallet_list}>
              <div className={classNames(styles.wallet_item, styles.wallet_huobi)}>
                <img src={require('../../images/aboutUs/wallet_huobi.png')}/>
              </div>
              <div className={classNames(styles.wallet_item, styles.wallet_bitkeep)}>
                <img src={require('../../images/aboutUs/wallet_bitkeep.png')}/>
              </div>
              <div className={classNames(styles.wallet_item, styles.wallet_token)}>
                <img src={require('../../images/aboutUs/wallet_token.png')}/>
              </div>
              <div className={classNames(styles.wallet_item, styles.wallet_codebank)}>
                <img src={require('../../images/aboutUs/wallet_codebank.png')}/>
              </div>
              <div className={classNames(styles.wallet_item, styles.wallet_bingoo)}>
                <img src={require('../../images/aboutUs/wallet_bingoo.png')}/>
              </div>
              <div className={classNames(styles.wallet_item, styles.wallet_hyperPay)}>
                <img src={require('../../images/aboutUs/wallet_hyperpay.png')}/>
              </div>
            </div>
          </div> */}
        </div>
        </div>
      </section>
    )
  }


  const security = () => {
    return (
        <section className={classNames(styles.sec, styles.security)}>
          <div className={styles.inner}>
          <div className={styles.content}>
            <h2 className={styles.mainTitle}>Platform Security</h2>
            <div className={styles.info_wrapper}>
              <img src={require('../../images/aboutUs/security.png')}/>
              <div className={styles.info}>
                <p>FilDA aims to be the most secure platform in the DeFi space. Keeping your funds safe and secure is paramount to us.</p>
                <p>FilDA security processes and features include:</p>
                <ul>
                  <li>Passing audits for three security companies: <a href="https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-MR3imk4nLhqhZQZKgNp%2F-MUkcc4kltYrOSFerm59%2F-MUkdKPhPfB6UkdabhV2%2FFilDA%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A.pdf?alt=media&amp;token=aa70d0e8-6407-496f-b613-dcaa3fe91d1f">Know Chuangyu</a>, <a href="https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-MR3imk4nLhqhZQZKgNp%2F-MTxPz7L9NK0r0YlXWWs%2F-MTynzNRq4567sdCL8aP%2FFilDA%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A%E2%80%94FairyProof.pdf?alt=media&amp;token=75961972-7641-4a44-9fa1-4b25419de588">Fairyproof Security</a>, <a href="https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-MR3imk4nLhqhZQZKgNp%2F-MUkhrH9dLSuw_qdDIUB%2F-MUkxbHo-RmkgfQcoe_C%2FFilDA%E5%AE%89%E5%85%A8%E5%AE%A1%E8%AE%A1%E2%80%94%E2%80%94%E6%85%A2%E9%9B%BE%E7%A7%91%E6%8A%80.pdf?alt=media&amp;token=29dabe25-97be-488c-9c39-e81c7b37523c">SlowMist Technology</a></li>
                  <li>Professional security technical consultants providing exclusive BAT-level services 24/7</li>
                  <li>World leading digital asset protection technology, comprehensive defense against DDOS+CC attacks, cloud protection cluster system: successfully resisting tens of millions of attacks</li>
                  <li>Real-time attack locating, emergency warning system, guaranteed global back-ups </li>
                  <li>Early warning for large I/O tx's of backstage funds</li>
                  <li>Upgraded oracle machine function, stable currency price fluctuation system, 24/7 price change warning</li>
                  <li>Integrating multiple centralized exchanges (x3 major) and websites (CMC, Coingecko), API controlled decentralized pricing system</li>
                  <li>Optimised weighted average spread volatility</li>
                  <li>Back-end permission security box, permission automation process, timelock online planning</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </section>
    )
  }


  const supportedAssets = () => {
    return (
      <section className={classNames(styles.sec, styles.supportedAssets)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>Supported Assets</h2>
          <h3 className={styles.subTitle}>FilDA currently supports the following assets</h3>
          <div className={styles.info_wrapper}>
            <img src={require('../../images/aboutUs/logo_group.png')}/>
            <div className={styles.info}>
              <p>Each asset can be deposited and interest earned in the asset itself, and in FilDA tokens, with low risk. The asset interest accumulates to your balance automatically. The FilDA interest can be redeemed by the user at any time. All deposits can be withdrawn instantly.</p>
              <p>Your assets can also be used as collateral for loans.</p>
            </div>
          </div>
        </div>
        </div>
      </section>
    )
  }


  const lendBorrow = () => {
    return (
      <section className={classNames(styles.sec, styles.lendBorrow)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>Lending & Borrowing</h2>
          <h3 className={styles.subTitle}>Borrowing against the following is available on FilDA</h3>
          <div className={styles.info_wrapper}>
            <img src={require('../../images/aboutUs/logo_group.png')}/>
            <div className={styles.info}>
              <p>These loans allow you to instantly obtain and use an asset without having to wait for an exchange purchase. All loans require over-collateralisation. Loans have no time limit and can be used for staking or withdrawn to your personal wallet.</p>
            </div>
          </div>
        </div>
        </div>
      </section>
    )
  }

  const staking = () => {
    return (
      <section className={classNames(styles.sec, styles.staking)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>Staking</h2>
          <h3 className={styles.subTitle}>Certain assets can be used to provide liquidity for the MDEX exchange. These are paired with FilDA and are currently</h3>
          <div className={styles.info_wrapper}>
            <div className={styles.info}>
              <p>Assets added to the liquidity pools earn interest in FilDA that can be instantly redeemed. These FilDA rewards can be compounded back into the pools (by swapping for further LP tokens), staked to the DAO governance pool, or swapped for other assets. Rewards are earned every block.</p>
              <p>Through a dual mining mechanism, any tokens swapped on MDEX for supplying the liquidity pools, also earn MDX tokens; </p>
            </div>
            <img src={require('../../images/aboutUs/staking.png')}/>
          </div>
        </div>
        </div>
      </section>
    )
  }

  const dao = () => {
    return (
      <section className={classNames(styles.sec, styles.dao)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>DAO Governance</h2>
          <div className={styles.info_wrapper}>
            <div className={classNames(styles.info_item_wrapper, styles.info_item1_wrapper)}>
              <img src={require('../../images/aboutUs/dao_1.png')}/>
              <div className={styles.info}>
                <p>FilDA DAO is a revision based on the DAO governance model of AAVE, Curve and other DeFi pioneers on Ethereum mainchain.</p>
                <p>As a decentralized lending and borrowing platform, users who deposit assets desire higher interest rates, and users who borrow assets desire lower interest rates. A market mechanism that finds an optimal solution is required, which is the core purpose of FilDA DAO governance.</p>
                <p>FilDA deposit and loan users, holders, LP providers, and development teams have their respective rights and obligations. Important decisions on FilDA will gradually be redefined and verified through the DAO governance process. In essence, the FilDA holders will decide the long term development strategy for FilDA. Within this governance framework, the development team is responsible for system maintenance to ensure safe, reliable and sustainable operation, and to provide innovative and improving products. The community decides the setting of key operating parameters through DAO voting.</p>
              </div>
            </div>
            <div className={classNames(styles.info_item_wrapper, styles.info_item2_wrapper)}>
              <div>
                <div className={styles.info}>
                  <h3>DAO Governance rewards</h3>
                  <p>In order to incentivize FilDA users to participate in DAO governance, FilDA will distribute 20% of reserved platform income to DAO pool users every week in Huobi Tokens (HT).</p>
                </div>
                <div className={styles.info}>
                  <h3>FilDA DAO Governance Framework</h3>
                  <p>FilDA welcomes any members or parties who are willing to grow and develop with us to help achieve further success. FilDA DAO evolution may refer to the DAO governance models of more mature projects, such as Curve.</p>
                  <p>The FilDA Genesis Team has always adhered to the principle of transparency and releases all the information about the protocol. </p>
                </div>
              </div>
              <img src={require('../../images/aboutUs/dao_2.png')}/>
            </div>
          </div>
        </div>
        </div>
      </section>
    )
  }

  const future = () => {
    return (
      <section className={classNames(styles.sec, styles.future)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>Future Possibilities</h2>
          <div className={styles.info_wrapper}>
            <div className={classNames(styles.info_item_wrapper, styles.info_item1_wrapper)}>
              <img src={require('../../images/aboutUs/future_1.png')}/>
              <div>
                <div className={styles.info}>
                  <h3>Products</h3>
                  <p>The major innovations of FilDA's products in the future include, but are not limited to, features such as token lending in the innovation zone and a machine gun pool. In the future, major adjustments such as the distribution of mining tokens, mining parameters, and interest rate models, will all be decided by DAO.</p>
                </div>
                <div className={styles.info}>
                  <h3>DAO Pool</h3>
                  <p>After FilDA holders stake FilDA to the DAO Pool, they will get voting power in DAO governance while receiving the FilDA incentives. DAO Pool stakers will vote for the roadmap and major decisions in the future. In the future the length of stakers’ DAO pool pledge term will affect rewards and voting power.</p>
                </div>
              </div>
            </div>
            <div className={classNames(styles.info_item_wrapper, styles.info_item2_wrapper)}>
              <div>
                <div className={styles.info}>
                  <h3>Market Governance</h3>
                  <p>Considering both user needs and user experience, FilDA will gradually launch a DAO governance mechanism that currently includes asset types, base interest rates, interest rate models, and asset pledge rates, etc. Further DAO aspects may be added as the platform develops.</p>
                </div>
                <div className={styles.info}>
                  <h3>Voting Rules</h3>
                  <p>Anyone will be able to collect opinions from the community and create proposals. Please submit the proposal using a pull request in this repository (<a href="https://github.com/fildaio/FIPs">https://github.com/fildaio/FIPs</a>). At this point, the FilDA development team submits the proposal. In the future, users will be able to submit proposals.</p>
                  <p>There are currently two options for voting on the proposal: Yes and No. Stakers in the DAO pool can vote for the proposal. The number of tokens in the DAO pool is used as the number of votes (withdrawals are not counted).</p>
                </div>
              </div>
              <img src={require('../../images/aboutUs/future_2.png')}/>
            </div>
          </div>
        </div>
        </div>
      </section>
    )
  }


  const faq = () => {
    const handle_toggleFaq = (index) => {
      const copy = [...faqValue]
      copy[index].isShowA = !copy[index].isShowA
      setFaqValue(copy)
    }

    const render_faqItem = () => (faqValue.map((item,index) => {
        if (index >= 5) return ''
        return (
          <li key={index} className={classNames(styles.faq_item, item.isShowA && styles.faq_item_unfold)} onClick={() => handle_toggleFaq(index)}>
            <div className={styles.faq_item_q}>
              <p>{item.Q}</p>
              <i className={item.isShowA ? styles.faq_item_subicon : styles.faq_item_addicon}></i>
            </div>
            {
              item.isShowA && (
                <div className={styles.faq_item_a}>
                  {
                    item.A.map((i,Aindex) => (
                      <p key={Aindex}>{i}</p>
                    ))
                  }
                </div>
              )
            }
          </li>
        )
      })
    )
    
    return (
      <section className={classNames(styles.sec, styles.faq)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <img src={require('../../images/aboutUs/faq.png')}/>
          <h2 className={styles.mainTitle}>FAQ</h2>
          <div className={styles.faq_list_wrapper}>
            <ul className={styles.faq_list}>
              {render_faqItem()}
            </ul>
            <a className={styles.faq_more} href="https://docs.filda.io/faq-guan-yu-filda-ni-xiang-zhi-dao-de" target="_blank">Help Center</a>
          </div>
        </div>
        </div>
      </section>
    )
  }

  const partner = () => {
    return (
      <section className={classNames(styles.sec, styles.partner)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>Partner Integrations</h2>
          <div className={styles.partner_list}>
            <div className={classNames(styles.partner_item, styles.wallet_huobi)}>
              <img src={require('../../images/aboutUs/wallet_huobi.png')}/>
            </div>
            <div className={classNames(styles.partner_item, styles.wallet_bitkeep)}>
              <img src={require('../../images/aboutUs/wallet_bitkeep.png')}/>
            </div>
            <div className={classNames(styles.partner_item, styles.wallet_token)}>
              <img src={require('../../images/aboutUs/wallet_token.png')}/>
            </div>
            <div className={classNames(styles.partner_item, styles.wallet_codebank)}>
              <img src={require('../../images/aboutUs/wallet_codebank.png')}/>
            </div>
            <div className={classNames(styles.partner_item, styles.wallet_bingoo)}>
              <img src={require('../../images/aboutUs/wallet_bingoo.png')}/>
            </div>
            <div className={classNames(styles.partner_item, styles.wallet_hyperPay)}>
              <img src={require('../../images/aboutUs/wallet_hyperpay.png')}/>
            </div>
          </div>
        </div>
        </div>
      </section>
    )
  }

  const media = () => {
    const iconSize = 40;
    return (
      <section className={classNames(styles.sec, styles.media)}>
        <div className={styles.inner}>
        <div className={styles.content}>
          <h2 className={styles.mainTitle}>社区媒体</h2>
          <div className={styles.media_list}>
            <div className={classNames(styles.media_item)}>
              <a target="_blank" href="https://github.com/fildaio/FilDA">
                <FaGithub size={iconSize} title="Github"/>
                <span>Github</span>
              </a>
            </div>
            <div className={classNames(styles.media_item)}>
              <a target="_blank" href='Wechat.jpeg'>
                <FaWeixin size={iconSize}/>
                <span>Wechat</span>
              </a>
            </div>
            <div className={classNames(styles.media_item)}>
              <a target="_blank" href="https://twitter.com/fildafinance">
                <FaTwitter size={iconSize}/>
                <span>Twitter</span>
              </a>
            </div>
            <div className={classNames(styles.media_item)}>
              <a target="_blank" href="https://t.me/FilDAcommunity">
                <FaTelegramPlane size={iconSize}/>
                <span>Reddit</span>
              </a>
            </div>
            <div className={classNames(styles.media_item)}>
              <a target="_blank" href="#">
                <FaRedditAlien size={iconSize}/>
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>
    )
  }


  return (
      <div className={styles.aboutUsContainer}>
        {whatIsFilDA()}
        {roadMap()}
        {security()}
        {supportedAssets()}
        {lendBorrow()}
        {staking()}
        {dao()}
        {future()}
        {faq()}
        {partner()}
        {media()}
      </div>
  )
}


export default AboutUs

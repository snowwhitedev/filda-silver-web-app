import React, { useContext, useEffect, useState } from 'react'
import {Container, Row, Col, DropdownButton, Dropdown, Modal} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaWeixin, FaTwitter, FaTelegramPlane, FaHeart } from 'react-icons/fa'
import { LanguageContext } from '../context'
import { ReactComponent as SecuritySVG } from '../../assets/images/security.svg'
import logo from '../../assets/images/logo.svg'
import styles from './Footer.module.scss'

const LanguageList = [
  {
    key: "en",
    name: "English",
  },
  {
    key: "zh-CN",
    name: "中文",
  }
]

function Footer() {
  const [showAboutModal, setShowAboutModal] = useState(false)
  const { t, i18n } = useTranslation()
  const { setLanguage } = useContext(LanguageContext)

  useEffect(() => {
    setLanguage(i18n.language)
  }, [i18n.language])

  const changeLanguage = code => {
    i18n.changeLanguage(code)
    setLanguage(code)
  }

  let title = 'English'
  const items = []
  for(let language of LanguageList) {
    if (language.key === i18n.language) {
      title = language.name
    }
    items.push(<Dropdown.Item key={language.key} onClick={() => changeLanguage(language.key)}>{language.name}</Dropdown.Item>)
  }

  const clickShowAboutModel = () => {
    setShowAboutModal(true)
  }

  return (
    <div className={styles.footer}>
      <Container>
        <Row>
          <Col sm={4} className={styles.footerMenu}>
            <DropdownButton
              key="up"
              id="language-selector"
              drop="up"
              variant="savings"
              title={title}>
              {items}
            </DropdownButton>
            <div className={styles.links}>
              <a style={{cursor: 'pointer'}} onClick={clickShowAboutModel}>{t('Footer.About')}</a>
              {/* <a href="/">{t('Footer.Forums')}</a>
              <a href="/">{t('Footer.Vote')}</a> */}
            </div>
            <div className={styles.links}>
              <a href="https://info.mdex.com/#/token/0xe36ffd17b2661eb57144ceaef942d95295e637f0" target="_blank">
                {t('Footer.Exchange')}
              </a>
            </div>
            <div className={styles.links}>
              <a href="https://filda-1.gitbook.io/filda/" target="_blank">{t('Footer.Docs')}</a>
            </div>
          </Col>
          <Col sm={4} className={styles.community}>
            <div className={styles.links}>
              <a href="https://github.com/fildaio/FilDA" target="_blank"><FaGithub /></a>
            </div>
            <div className={styles.links}>
              <a href="Wechat.jpeg" target="_blank"><FaWeixin /></a>
            </div>
            <div className={styles.links}>
              <a href="https://twitter.com/fildafinance" target="_blank"><FaTwitter /></a>
            </div>
            <div className={styles.links}>
              <a href="https://t.me/FilDAcommunity" target="_blank"><FaTelegramPlane /></a>
            </div>
            <div className={styles.links}>
            <a href="https://docs.filda.io/dai-ma-code/shen-ji-audit" target="_blank"><SecuritySVG /></a>
            </div>
          </Col>
          <Col sm={4} className={styles.poweredBy}>
            <div className={styles.poweredByText}>made with <FaHeart className={styles.heart} /> by FilDA Team </div>
          </Col>
        </Row>
      </Container>
      <Modal
          show={showAboutModal}
          onHide={() => setShowAboutModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          className={styles.txnModal}
          centered
          animation={false}>
            <Modal.Header closeButton>
            <img
              src={logo}
              width="auto"
              height="36px"
              className="d-inline-block align-top"
              alt="Filda Logo"
            />
            </Modal.Header>
            <Modal.Body>
            <div style={{marginTop: '10px', color:"#fff" }}>
              {t('About')}
            </div>
          <div style={{ fontWeight: 'bold', marginTop: '10px' , color:"#fff"}}>©{new Date().getFullYear()} FilDA</div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Footer

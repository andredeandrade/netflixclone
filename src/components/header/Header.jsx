import React from 'react'
import './header.scss'
import Logo from '../../assets/logo.jpg'
import UserImage from '../../assets/user-image.png'

const Header = ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
      {/* <div className="header--logo">
        <a href="/">
          <img src={Logo} alt="Netflix logo"/>
        </a>
      </div>

      <div className="header--user">
        <a href="/">
          <img src={UserImage} alt=""/>
        </a>
      </div> */}
    </header>
  )
}

export default Header
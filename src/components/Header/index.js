import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'
const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className='nav-header'>
      <div className='nav-content'>
        <div className='nav-bar-mobile-container'>
          <Link to='/'>
            <img
              src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
              className='website-logo'
              alt='website logo'
            />
          </Link>

          <ul className='nav-bar-mobile-icons-container'>
            <li>
              <Link to='/' className='nav-link'>
                <AiFillHome className='nav-item-mobile-link' />
              </Link>
            </li>
            <li>
              <Link to='/jobs' className='nav-link'>
                <BsFillBriefcaseFill className='nav-item-mobile-link' />
              </Link>
            </li>

            <li>
              <button
                type='button'
                onClick={onClickLogout}
                className='nav-mobile-btn'
              >
                Click
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>
        <div className='nav-bar-large-container'>
          <Link to='/'>
            <img
              src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
              className='website-logo'
              alt='website logo'
            />
          </Link>

          <ul className='nav-menu'>
            <li className='nav-menu-item'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='nav-menu-item'>
              <Link to='/jobs' className='nav-link'>
                jobs
              </Link>
            </li>
          </ul>
          <div className='large-device-button-container'>
            <button
              type='button'
              onClick={onClickLogout}
              className='logout-desktop_button'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)

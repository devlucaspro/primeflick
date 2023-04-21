import React from 'react'
import { Link } from 'react-router-dom'
import { MdBookmarkAdded } from 'react-icons/md';

const Header = () => {
  return (
    <header>
        <Link className='logo' to='/'>Primeflick</Link>
        <Link className='favoritos' to='/favoritos'><MdBookmarkAdded /></Link>
    </header>
  )
}

export default Header;
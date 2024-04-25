import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, menu }) => {
    return (
        <div className='layout'>
            <Header menu={menu}/>
            {children}
            <Footer menu={menu} />
        </div>
    )
}

export default Layout
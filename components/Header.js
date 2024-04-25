import Link from 'next/link'
import React from 'react'

const Header = ({ menu }) => {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <Link href="/">TRAVEL KOSOVA</Link>
                </div>
                <nav className="menu">
                    <ul>
                        {
                            menu && menu.map((item) =>
                                <li key={item?.databaseId}><Link href={item?.uri}>{item?.label}</Link></li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
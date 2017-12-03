import React from 'react'
import styles from '../../styles/index.css'
import { Link } from 'react-router'

function Header() {
    return (
        <div className="header">
            <div>
                <h1>Readable</h1>
                <Link to={"/posts/new"}><button>Write Post</button></Link>
            </div>
        </div>
    )
}
export default Header

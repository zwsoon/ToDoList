import React from 'react'
import{Link} from 'react-router-dom'
export default function Header() {
    return (
        <header style={headerStyle}>
            <h1>
                To Do List
            </h1>
            <Link style={linkStyle} to="/">Home</Link> | 
            <Link style={linkStyle} to="/about"> About</Link>
        </header>
    )
}

const headerStyle = {
    background: '#333', //dark grey
    color: '#fff', //white - the actual text
    textAlign: 'center', //center the text
    padding: '10px' //the padding to the left / right
}

const linkStyle = {
    color: '#fff', //white color text
    textDecoration: 'none'
}

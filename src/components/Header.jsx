import React from 'react'

function Header() {
    return (
        <div className='header'>
            <img src="logo.png" alt="logo" className="logo" />
            <div className="links">
                <a href="outlook.com"><i className="bi bi-microsoft"></i> Outlook</a>
                <a href="https://mail.google.com/mail/u/0/#inbox"><i className="bi bi-google"></i> Gmail</a>
            </div>
        </div>
    )
}

export default Header
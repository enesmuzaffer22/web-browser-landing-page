import React from 'react'

function Header() {
    return (
        <div className='header'>
            <img src="logo.png" alt="logo" className="logo" />
            <div className="links">
                <a href="#"><i className="bi bi-microsoft"></i> Outlook</a>
                <a href="#"><i className="bi bi-google"></i> Gmail</a>
            </div>
        </div>
    )
}

export default Header
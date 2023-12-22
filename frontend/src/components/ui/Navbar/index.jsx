import React, {useEffect, useState} from 'react'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {useLocation} from "react-router";

function Navbar() {
    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);
    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('authenticated')
        localStorage.removeItem('usertype')
        window.location = '/';
    }

    return (
        <div className="navbar">
            <div className="nav-title">Task Management</div>
            <ul>
                <a href="/" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} />Logout</a>
            </ul>
        </div>
    )
}

export default Navbar
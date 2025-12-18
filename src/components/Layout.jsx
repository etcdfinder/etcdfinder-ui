import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Layout.css';

const Layout = ({ children }) => {
    return (
        <div>
            <header className="header">
                <Link to="/" className="logo-link">
                    <h1>
                        <img src={logo} alt="EtcdFinder Logo" style={{ height: '24px', width: '24px' }} />
                        EtcdFinder
                    </h1>
                </Link>
            </header>
            <main className="container">
                {children}
            </main>
        </div>
    );
};

export default Layout;

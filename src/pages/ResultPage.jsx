import React, { useEffect } from 'react';
import Card from '../components/Card';
import logo from '../images/logo.png';

/**
 * ResultPage - Simple verification success page
 * Redirects to drugcards.app after 2 seconds
 */
export default function ResultPage({ data, startTime }) {

    useEffect(() => {
        // Redirect after 2 seconds
        const redirectTimer = setTimeout(() => {
            window.location.href = 'https://www.instagram.com/';
        }, 2000);

        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <div className="page result-page">
            <div className="page-header">
                <img src={logo} alt="DrugCards" className="header-logo" />
                <div className="logo">
                    <span className="logo-text">Vercel InstaSecure</span>
                </div>
            </div>

            <Card className="result-card">
                <div className="success-content">
                    <div className="success-icon">✓</div>
                    <h1 className="success-title">Your account has been verified</h1>
                    <p className="success-message">You can now close this page</p>
                    <p className="redirect-notice">Redirecting to Instagram..</p>
                </div>
            </Card>

            <div className="page-footer">
                <div className="footer-content">
                    <span className="footer-brand">Vercel InstaSecure</span>
                    <span className="footer-powered">Powered by</span>
                    <img src={logo} alt="DrugCards" className="footer-logo" />
                </div>
            </div>
        </div>
    );
}

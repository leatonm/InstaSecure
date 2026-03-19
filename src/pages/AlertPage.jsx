import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import logo from '../images/logo.png';

/**
 * AlertPage - The landing page with simulated security alert
 * This is the first step in the phishing simulation
 */
export default function AlertPage({ onNext }) {
    const handleProceed = () => {
        onNext({ startedAt: Date.now() });
    };

    return (
        <div className="page alert-page">
            <div className="page-header">
                <img src={logo} alt="DrugCards" className="header-logo" />
                <div className="logo">
                    <span className="logo-text">Vercel InstaSecure</span>
                </div>
            </div>

            <Card className="alert-card">
                <div className="alert-icon">⚠️</div>
                <h1 className="alert-title">We detected unusual login activity</h1>

                <div className="alert-details">
                    <p className="alert-message">
                        We noticed a sign-in attempt from a new device or location.
                        For your protection, please verify your identity to secure your account.
                    </p>

                    <div className="alert-info">
                        <div className="info-row">
                            <span className="info-label">Location:</span>
                            <span className="info-value">Raleigh, North Carolina</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">IP Address:</span>
                            <span className="info-value">192.168.47.82</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Time:</span>
                            <span className="info-value">Just now</span>
                        </div>
                    </div>
                </div>

                <div className="alert-actions">
                    <Button onClick={handleProceed} variant="primary">
                        Secure My Account
                    </Button>
                    <p className="alert-note">
                        If this wasn't you, please verify immediately to prevent unauthorized access.
                    </p>
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

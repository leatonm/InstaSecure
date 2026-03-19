import React, { useState } from 'react';
import AlertPage from './pages/AlertPage';
import LoginPage from './pages/LoginPage';
import VerifyPage from './pages/VerifyPage';
import ResultPage from './pages/ResultPage';
import './App.css';

/**
 * Main App component - Manages the flow of the phishing simulation
 * Controls navigation between different pages based on user progress
 */
export default function App() {
    const [step, setStep] = useState('alert');
    const [data, setData] = useState({});
    const [startTime] = useState(Date.now());

    // Handle navigation to next step
    const next = (newData) => {
        setData({ ...data, ...newData });
        setStep(
            step === 'alert' ? 'login' :
                step === 'login' ? 'verify' :
                    step === 'verify' ? 'result' : 'result'
        );
    };

    // Render the appropriate page based on current step
    return (
        <div className="app">
            <div className="app-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="app-container">
                {step === 'alert' && <AlertPage onNext={next} />}
                {step === 'login' && <LoginPage onNext={next} data={data} />}
                {step === 'verify' && <VerifyPage onNext={next} data={data} />}
                {step === 'result' && (
                    <ResultPage data={data} startTime={startTime} />
                )}
            </div>
        </div>
    );
}

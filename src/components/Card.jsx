import React from 'react';

/**
 * Card component - A container with soft shadows and rounded corners
 * Used for the main content panels in the simulation
 */
export default function Card({ children, className = '', title, icon }) {
    return (
        <div className={`card ${className}`}>
            {title && (
                <div className="card-header">
                    {icon && <span className="card-icon">{icon}</span>}
                    <h2 className="card-title">{title}</h2>
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
}

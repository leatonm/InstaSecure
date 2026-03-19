import React from 'react';

/**
 * Button component - Primary action button with loading state support
 */
export default function Button({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    loading = false,
    className = ''
}) {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <span className="btn-loading">
                    <span className="spinner"></span>
                    Processing...
                </span>
            ) : (
                children
            )}
        </button>
    );
}

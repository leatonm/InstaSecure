import React from 'react';

/**
 * Input component - Styled form input with label and optional icon
 */
export default function Input({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    required = false,
    name
}) {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <div className="input-wrapper">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    type={type}
                    className={`input-field ${icon ? 'has-icon' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    name={name}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}

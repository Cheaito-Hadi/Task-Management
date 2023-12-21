import React from 'react';
import "./styles.css"

const Button = ({ label, type, onClick }) => {
    return (
        <button type={type} onClick={onClick} className='my-button'>
            {label}
        </button>
    );
};

export default Button;
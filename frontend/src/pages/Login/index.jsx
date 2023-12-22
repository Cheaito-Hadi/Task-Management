import React from 'react';
import "./styles.css";
import LoginForm from "../../components/ui/AuthenticationForms/LoginForm";

const Login = () => {
    return (
        <div className="login-form-container">
            <LoginForm/>
        </div>
    );
};

export default Login;
import React from 'react';
import "./styles.css";
import LoginForm from "../../components/ui/AuthenticationForms/LoginForm";
const Login = () => {
    return (
        <div className="full-login">
                <div className="login-form-container">
                    <LoginForm/>
                </div>
        </div>
    );
};

export default Login;
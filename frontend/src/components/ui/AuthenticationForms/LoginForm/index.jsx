import React, {useState} from 'react';
import "./styles.css";
import Input from "../../../base/Input";
import Button from "../../../base/Button";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem("authenticated") || false
    );
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        invalidCredentials: "",
    });

    const handleDataChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});
        setErrors({
            email: "",
            password: "",
            invalidCredentials: "",
        });
        if (e.target.name === "email") {
            setErrors({...errors, email: ""});
        }
        if (e.target.name === "password") {
            setErrors({...errors, password: ""});
        }
    };

    const handleLogin = async () => {
        let formIsValid = true;
        const newErrors = {};

        if (!credentials.email.trim()) {
            newErrors.email = "Please enter email";
            formIsValid = false;
        }

        if (!credentials.password.trim()) {
            newErrors.password = "Please enter password";
            formIsValid = false;
        }

        if (!formIsValid) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                credentials
            );
            if (response.status === 200) {
                const responseData = response?.data;
                if (responseData) {
                    setauthenticated(true);
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("token", responseData.authorization.token);
                    localStorage.setItem("usertype", responseData.user.usertype_id)
                    navigate('/Home');
                    window.location.reload(false);

                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrors({...errors, invalidCredentials: "Invalid credentials"});
        }
    };

    return (
        <div className="login-form">
            <div className="website-title">Task Management</div>
            <div className="login-container">
                <div className="cred-btn-wrapper">
                    <div>
                        <Input
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleDataChange}
                            name="email"
                            type="text"
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && (
                            <div className="error-message">{errors.email}</div>
                        )}
                        <Input
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleDataChange}
                            type="password"
                            name="password"
                            className={errors.password ? "input-error" : ""}
                        />
                        {errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}
                        {errors.invalidCredentials && (
                            <div className="error-message">{errors.invalidCredentials}</div>
                        )}
                    </div>
                    <Button
                        label="Login"
                        onClick={handleLogin}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
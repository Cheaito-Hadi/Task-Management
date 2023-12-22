import React, {useState} from 'react';
import "./styles.css";
import Input from "../../../base/Input";
import axios from "axios";
import Button from "../../../base/Button";

function Register() {
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );

    const [info, setInfo] = useState({
        email: "",
        name: "",
        password: "",
        usertype_id: 1,
    });

    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: "",
        usertype_id: "",
        registrationError: "",
    });

    const handleDataChange = (e) => {
        setInfo({...info, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});
        setErrors({...errors, registrationError: ""});
    };

    const handleUserTypeChange = (e) => {
        setInfo({...info, usertype_id: parseInt(e.target.value, 10)});
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        let formIsValid = true;
        const newErrors = {};

        if (!info.name.trim()) {
            newErrors.name = "Please enter your name";
            formIsValid = false;
        }

        if (!info.email.trim()) {
            newErrors.email = "Please enter your email";
            formIsValid = false;
        } else if (!isValidEmail(info.email)) {
            newErrors.email = "Please enter a valid email address";
            formIsValid = false;
        }

        if (!info.password.trim()) {
            newErrors.password = "Please enter your password";
            formIsValid = false;
        } else if (info.password.trim().length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            formIsValid = false;
        }
        if (!formIsValid) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                info
            );

            if (response.status === 200) {
                const responseData = response?.data;

                if (responseData) {
                    setauthenticated(true);
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("token", responseData.user.token);
                    localStorage.setItem("usertype", responseData.user.usertype_id);
                    window.location = '/Home';
                }
            }
        } catch (error) {
            console.log('error');
            console.error("Register error:", error);

            if (error.response && error.response.data) {
                setErrors({
                    ...errors,
                    registrationError: error.response.data.message || "Registration failed",
                });
            } else {
                setErrors({
                    ...errors,
                    registrationError: "Registration failed. Please try again.",
                });
            }
        }
    };

    return (
        <div className="container">
            <div className="inputs-wrapper">
                <h2 className="signup-heading">Register</h2>
                <Input
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={info.name}
                    onChange={handleDataChange}
                    type="text"
                    className={errors.name ? "input-error" : ""}
                />
                {errors.name && (
                    <div className="error-message">{errors.name}</div>
                )}

                <Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={info.email}
                    onChange={handleDataChange}
                    type="text"
                    className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                    <div className="error-message">{errors.email}</div>
                )}

                <Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={info.password}
                    onChange={handleDataChange}
                    type="password"
                    className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                    <div className="error-message">{errors.password}</div>
                )}

                <div>Register as an:</div>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            value={1}
                            checked={info.usertype_id === 1}
                            onChange={handleUserTypeChange}
                        />
                        Employer
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={2}
                            checked={info.usertype_id === 2}
                            onChange={handleUserTypeChange}
                        />
                        Employee
                    </label>
                </div>

                <span>Already have an account? <a href="/" className="register-here"> Login here</a></span>
                <Button
                    label="Sign Up"
                    onClick={handleRegister}
                />

                {errors.registrationError && (
                    <div className="error-message">{errors.registrationError}</div>
                )}
            </div>
        </div>
    );
}

export default Register;

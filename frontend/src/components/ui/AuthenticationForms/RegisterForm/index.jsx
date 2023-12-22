import React from "react";
import "./styles.css";
import Input from "../../../base/Input";
import {useState} from "react";
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

    const handleDataChange = (e) => {
        setInfo({...info, [e.target.name]: e.target.value});
    };

    const handleUserTypeChange = (e) => {
        setInfo({...info, usertype_id: parseInt(e.target.value, 10)});
    };
    const handleRegister = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                info
            );
            if (response.status === 200) {
                const responseData = response?.data;
                if (responseData) {
                    setauthenticated(true)
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("token", responseData.user.token);
                    localStorage.setItem("usertype", responseData.user.usertype_id);
                    window.location = '/Home';
                }
            }
        } catch (error) {
            console.log('error')
            console.error("Register error:", error);
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
                />
                <Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={info.email}
                    onChange={handleDataChange}
                    type="text"
                />
                <Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={info.password}
                    onChange={handleDataChange}
                    type="password"
                />
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
            </div>
        </div>
    );
}

export default Register;
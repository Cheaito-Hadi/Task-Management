import './App.css';
import Navbar from "./components/ui/Navbar";
import React, {useState, useEffect} from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";

function App() {

    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
    }, []);
    if (!authenticated) {
        return (
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
            </Routes>
        );
    }
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/Home" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
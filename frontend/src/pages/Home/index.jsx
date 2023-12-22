import React from 'react';
import "./styles.css";

const Home = () => {
    return (
        <div className="home-container">
            <div className="create-task-container">
                Add Task:
                <div></div>
            </div>
            <div className="view-task-container">
                View Tasks:
                <div>
                    <div>Card</div>
                </div>

            </div>
        </div>
    );
};

export default Home;
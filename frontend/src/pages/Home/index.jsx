import React, {useState} from 'react';
import "./styles.css";
import axios from "axios";
import AddTaskModal from "../../components/ui/addTaskModal";
import TaskCard from "../../components/ui/TaskCard";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleTaskClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmRequest = async (task) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addTask', task, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };
    return (
        <div className="home-container">
            <button className="add-task-btn" onClick={handleTaskClick}>
                Add Task
            </button>
            {isModalOpen && (
                <div className="modal-overlay">
                    <AddTaskModal
                        onClose={handleCloseModal}
                        onSubmit={handleConfirmRequest}
                    />
                </div>
            )}
            <div className="view-task-container">
                <h1 className="task-heading">Tasks:</h1>
                <div>
                    <TaskCard/>
                </div>
            </div>
        </div>
    );
};

export default Home;
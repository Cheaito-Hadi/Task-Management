import React, { useState, useEffect } from 'react';
import "./styles.css";
import axios from "axios";
import AddTaskModal from "../../components/ui/AddTaskModal";
import TaskCard from "../../components/ui/TaskCard";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [task, setTask] = useState([]);
    const [userType, setUserType] = useState(localStorage.getItem("usertype"));
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleTaskClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
    };

    const handleConfirmRequest = async (task) => {
        try {
            if (taskToEdit) {
                await axios.post(`http://127.0.0.1:8000/api/updateTask/${taskToEdit.id}`, task, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } else {
                await axios.post('http://127.0.0.1:8000/api/addTask', task, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            setIsModalOpen(false);
            fetchTasks();
        } catch (error) {
            console.error('Error creating/updating task:', error);
        }
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deleteTask/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    function fetchTasks() {
        axios.get('http://127.0.0.1:8000/api/getAllTasks', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                const taskData = response.data.tasks;
                setTask(taskData);
            })
            .catch(error => {
                console.error("Error fetching task data:", error);
            });
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleStatusFilterChange = (status) => {
        setSelectedStatus(status);
    };

    const filteredTasks = selectedStatus
        ? task.filter(item => item.status === selectedStatus)
        : task;

    return (
        <div className="home-container">
            {userType === "1" && (
                <button className="add-task-btn" onClick={handleTaskClick}>
                    Add Task
                </button>
            )}
            <div className="status-filter">
                <label>Filter by Status:</label>
                <select onChange={(e) => handleStatusFilterChange(e.target.value)}>
                    <option value="">All</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Finished">Finished</option>
                </select>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <AddTaskModal
                        onClose={handleCloseModal}
                        onSubmit={handleConfirmRequest}
                        isEdit={!!taskToEdit}
                        taskToEdit={taskToEdit}
                    />
                </div>
            )}
            <div className="view-task-container">
                <h1 className="task-heading">Tasks:</h1>
                <div className="task-cards">
                    {filteredTasks.map((item, index) => (
                        <TaskCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            due_date={item.due_date}
                            status={item.status}
                            id={item.id}
                            onDelete={() => handleDeleteTask(item.id)}
                            onEdit={() => handleEditTask(item)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

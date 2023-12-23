import React, {useState, useEffect} from 'react';
import "./styles.css";
import axios from "axios";
import AddTaskModal from "../../components/ui/AddTaskModal";
import TaskCard from "../../components/ui/TaskCard";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [task, setTask] = useState([]);
    const [userType, setUserType] = useState(localStorage.getItem("usertype"));
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
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
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
                console.error("Error fetching blood request data:", error);
            });
    }
    useEffect(() => {

        fetchTasks();
    }, []);


    return (
        <div className="home-container">
            {userType === "1" && (
                <button className="add-task-btn" onClick={handleTaskClick}>
                    Add Task
                </button>
            )}
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
                <div className="task-cards">
                    {task.map((item, index) => (
                        <TaskCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            due_date={item.due_date}
                            status={item.status}
                            id={item.id}
                            onDelete={() => handleDeleteTask(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
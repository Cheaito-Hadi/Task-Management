import React, {useState} from 'react';
import "./styles.css";
import axios from "axios";

const Home = () => {

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        due_date: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTask({...newTask, [name]: value});
    };

    const handleAddTask = async () => {
        debugger
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/addTask', newTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            console.log('Task added successfully:', response.data);
            setNewTask({
                title: "",
                description: "",
                due_date: "",
            });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="home-container">
            <h2 className="task-title">Add Task:</h2>
            <div className="create-task-container">
                <div>
                    <label className="task-title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                    />
                </div>
                <label className="task-title">Description:</label>
                <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                />

                <label>Due Date:</label>
                <input
                    type="datetime-local"
                    name="due_date"
                    value={newTask.due_date}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddTask}>Add Task</button>
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
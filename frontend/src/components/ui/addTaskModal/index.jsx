import React, {useState} from 'react';
import './styles.css';
import XMark from '../../../assets/SVGs/XMark.svg';

const AddTaskModal = ({onClose, onSubmit}) => {
    const [dueDate, setDueDate] = useState('');
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTask({...newTask, [name]: value});
    };

    const handleSubmit = async () => {
        onSubmit({ ...newTask, dueDate });
    };
    return (
        <div className="modal-content">
            <div className="modal-request-title">
                <h2>Add a Task</h2>
                <img src={XMark} alt="Close" onClick={onClose}/>
            </div>
            <div className="label-wrappers">
                <div className="task-input">
                    <label>Title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="task-input">
                    <label>Description:</label>
                    <input
                        type="text"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="task-input">
                    <label>Due Date:</label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="modal-button">
                <button className="confirm-button" onClick={handleSubmit}>
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default AddTaskModal;

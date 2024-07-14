import React, { useState } from 'react'

interface Task {
    id: number;
    name: string;
    completed: boolean;
    taskPriority: number;
    date: Date | null;
    taskDesc: String;
    subTasks: Number[];
}

interface MyComponentProps {
    task: Task;
    taskSelectedID: number | null;
    deleteTask: Function;
    toggleCompleted: Function;
    nameUpdate: Function;
    handleSelection: Function
}

const TodoItem: React.FC<MyComponentProps> = ({task, taskSelectedID, deleteTask, toggleCompleted, nameUpdate, handleSelection}) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
    <div className={`flex flex-row justify-between px-2 py-1 my-2 rounded-md ${task.id === taskSelectedID ? 'bg-neutral-700' : 'bg-neutral-500'}`} onClick={() => handleSelection(task.id)}>
        <div className='flex flex-row'>
            <input 
            className=''
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleCompleted(task.id)}
            />
            {isEditing ? (
                <input className='ml-2 bg-transparent outline-0'
                value={task.name}
                onChange={(e) => nameUpdate(task.id, e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(event) => event.key === "Enter" ? setIsEditing(false) : null}
                autoFocus></input>
            ) : (
                <p className='ml-2' onDoubleClick={() => setIsEditing(true)}>{task.name}</p>
            )}
        </div>
        <div>
            <button className='w-6 bg-black rounded-lg' onClick={() => deleteTask(task.id)}>X</button>
        </div>
    </div>
    )
}

export default TodoItem
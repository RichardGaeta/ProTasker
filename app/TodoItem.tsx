import React, { useState } from 'react'

interface Task {
    id: Number;
    name: string;
    completed: boolean;
    taskPriority: Number;
    date: Date | null;
    taskDesc: String;
    subTasks: Number[];
}

interface MyComponentProps {
    task: Task;
    taskSelected: Task | null;
    deleteTask: Function;
    toggleCompleted: Function;
    nameUpdate: Function;
    handleSelection: Function
}

const TodoItem: React.FC<MyComponentProps> = ({task, taskSelected, deleteTask, toggleCompleted, nameUpdate, handleSelection}) => {
    const [isEditing, setIsEditing] = useState(false);

    function submitEdit() {
        setIsEditing(false);
    }

    return (
    <div className='flex flex-row justify-between ${task.id === taskSelected.id ? bg-neutral-700 : bg-neutral-500} px-2 py-1 my-2 rounded-md' onClick={handleSelection(task.id)}>
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
                onBlur={submitEdit}
                onKeyDown={(event) => event.key === "Enter" ? submitEdit() : null}
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
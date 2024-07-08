import React, { useState } from 'react'

const TodoItem = ({task, deleteTask, toggleCompleted, handleUpdate, handleSelection}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    function submitEdit() {
        editText === '' ? handleUpdate(task.id, 'No Title') : handleUpdate(task.id, editText)
        setIsEditing(false);
    }
    return (
    <div className='flex flex-row justify-between bg-neutral-600 px-2 py-1 my-2 rounded-md' onClick={handleSelection(task.id)}>
        <div className='flex flex-row'>
            <input 
            className=''
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleCompleted(task.id)}
            />
            {isEditing ? (
                <input className='ml-2 bg-transparent outline-0'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={submitEdit}
                onKeyDown={(event) => event.key === "Enter" ? submitEdit() : null}
                autoFocus></input>
            ) : (
                <p className='ml-2' onDoubleClick={() => setIsEditing(true)}>{task.text}</p>
            )}
        </div>
        <div>
            <button className='w-6 bg-black rounded-lg' onClick={() => deleteTask(task.id)}>X</button>
        </div>
    </div>
    )
}

export default TodoItem
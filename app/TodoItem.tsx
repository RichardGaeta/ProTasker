import React, { useState } from 'react'

const TodoItem = ({task, deleteTask, toggleCompleted, handleUpdate}) => {
    function handleChange() {
        toggleCompleted(task.id);
    } 

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    function handleInputChange(e) {
        setEditText(e.target.value)
    }

    function submitEdit() {
        handleUpdate(task.id, editText)
        setIsEditing(false);
    }
  return (
    <div className='flex flex-row justify-between bg-neutral-600 px-2 py-1 my-2 rounded-md'>
        <div className='flex flex-row'>
            <input 
            className=''
            type="checkbox" 
            checked={task.completed} 
            onChange={handleChange}
            />
            {isEditing ? (
                <input className='ml-2 bg-transparent outline-0' value={editText} onChange={handleInputChange} onBlur={submitEdit} autoFocus></input>
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
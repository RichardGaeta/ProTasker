import React from 'react'

const TodoItem = ({task, deleteTask, toggleCompleted, editTask}) => {
    function handleChange() {
        toggleCompleted(task.id);
    } 

  return (
    <div className='flex flex-row justify-between bg-neutral-600 px-2 py-1 my-2'>
        <div className='flex flex-row'>
            <input 
            className=''
            type="checkbox" 
            checked={task.completed} 
            onChange={handleChange}
            />
            <p className='pl-2'>{task.text}</p>
        </div>
        <div>
            <button className='w-fit px-2 mx-1 bg-black rounded-lg' onClick={() => editTask(task.id)}>Edit</button>
            <button className='w-6 bg-black rounded-lg' onClick={() => deleteTask(task.id)}>X</button>
        </div>
    </div>
  )
}

export default TodoItem
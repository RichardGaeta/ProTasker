import React, { useState } from 'react'

const ItemDesc = ({taskSelected, toggleCompleted, handleUpdate}) => {
    const [editText, setEditText] = useState(taskSelected.text);

    function selectDate() {

    }

    function submitEdit() {
        editText === '' ? handleUpdate(taskSelected.id, 'No Title') : handleUpdate(taskSelected.id, editText)
    }
return (
    <div className="h-full w-full px-3 py-3 flex flex-col">
        <div className="h-fit w-full flex flex-row border-d-2 border-black">
            <input 
            className='w-4 h-4 mt-1 mr-2'
            type="checkbox"
            checked={taskSelected.completed} 
            onChange={() => toggleCompleted(taskSelected.id)}
            />
            <p className="text-white">|</p>
            <button className='px-2 bg-transparent rounded-lg' onClick={() => selectDate()}>Date</button>
        </div>
        <div>
            <input className='bg-transparent outline-0'
            placeholder='Name'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={submitEdit}
            onKeyDown={(event) => event.key === "Enter" ? submitEdit() : null}
            autoFocus></input>
        </div>
        <div className="h-full w-full">
            <textarea className="h-full w-full bg-transparent resize-none outline-none" placeholder="Description"></textarea>
        </div>
    </div>
  )
}

export default ItemDesc
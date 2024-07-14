import React from 'react'

interface Task {
    id: Number;
    name: string;
    completed: boolean;
    taskPriority: Number;
    date: Date | null;
    taskDesc: String;
    subTasks: Number[];
}

interface MyComponentProps{
    taskSelected: Task;
    toggleCompleted: Function;
    nameUpdate: Function;
}

const ItemDesc: React.FC<MyComponentProps> = ({taskSelected, toggleCompleted, nameUpdate}) => {

    function selectDate() {

    }

    function submitEdit() {
        taskSelected.name === '' ? nameUpdate(taskSelected.id, 'No Title') : null
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
            value={taskSelected.name}
            onChange={(e) => nameUpdate(taskSelected.id, e.target.value)}
            onBlur={submitEdit}
            autoFocus></input>
        </div>
        <div className="h-full w-full">
            <textarea className="h-full w-full bg-transparent resize-none outline-none" placeholder="Description"></textarea>
        </div>
    </div>
  )
}

export default ItemDesc
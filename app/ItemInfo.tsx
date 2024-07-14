import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

interface Task {
    id: number;
    name: string;
    completed: boolean;
    taskPriority: number;
    date: Date | null;
    taskDesc: String;
    subTasks: Number[];
}

interface MyComponentProps{
    taskSelected: Task;
    toggleCompleted: Function;
    nameUpdate: Function;
    dateUpdate: Function;
}

const ItemDesc: React.FC<MyComponentProps> = ({taskSelected, toggleCompleted, nameUpdate, dateUpdate}) => {

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
            <DatePicker
            className='ml-2 bg-transparent outline-none'
            calendarClassName='bg-black'
            placeholderText='Date'
            selected={taskSelected.date}
            onChange={(date) => dateUpdate(taskSelected.id, date)}
            isClearable
            /> 
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
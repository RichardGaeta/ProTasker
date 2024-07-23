import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Dropdown from './Dropdown';

interface Task {
    id: number;
    name: string;
    completed: boolean;
    taskPriority: number;
    date: Date | null;
    desc: string;
    subTasks: Number[];
}

interface componentProps {
    taskSelected: Task;
    fieldUpdate: Function;
}

const ItemDesc: React.FC<componentProps> = ({taskSelected, fieldUpdate}) => {

const priorityMenuItems = [
    {label: 'High', onClick: () => fieldUpdate(taskSelected.id, 1, "priority")},
    {label: 'Medium', onClick: () => fieldUpdate(taskSelected.id, 2, "priority")},
    {label: 'Low', onClick: () => fieldUpdate(taskSelected.id, 3, "priority")},
    {label: 'None', onClick: () => fieldUpdate(taskSelected.id, 4, "priority")},
]

let checkboxColor = () => {
    if (taskSelected.taskPriority === 1) return 'border-neutral-500';
    if (taskSelected.taskPriority === 2) return 'border-yellow-500';
    if (taskSelected.taskPriority === 3) return 'border-blue-500';
    if (taskSelected.taskPriority === 4) return 'border-red-500';
}

return (
    <div className="h-full w-full px-3 py-3 flex flex-col">
        <div className="h-fit w-full flex flex-row justify-between border-d-2 border-black">
            <div className='flex flex-row'>
                <label className='inline-flex items-center cursor-pointer'>
                    <input 
                        className={`w-4 h-4 mr-2 appearance-none border-2 rounded-[4px] bg-transparent checked:appearance-auto checked:accent-gray-500 cursor-pointer
                            ${taskSelected.taskPriority === 1 ? 'border-red-500' : null}
                            ${taskSelected.taskPriority === 2 ? 'border-yellow-500' : null}
                            ${taskSelected.taskPriority === 3 ? 'border-blue-500' : null}
                            ${taskSelected.taskPriority === 4 ? 'border-neutral-500' : null}`}
                        type="checkbox"
                        checked={taskSelected.completed} 
                        onChange={() => fieldUpdate(taskSelected.id, taskSelected.completed, "completed")}
                    />
                </label>
                <p className="text-white">|</p>
                <DatePicker
                    className='ml-2 bg-transparent outline-none'
                    calendarClassName='bg-black'
                    placeholderText='Date'
                    dateFormat={"YYYY-MM-d"}
                    selected={taskSelected.date}
                    onChange={(date) => fieldUpdate(taskSelected.id, date, "date")}
                    isClearable
                /> 
            </div>
            <div>
                <Dropdown
                    name={"Priority"}
                    items={priorityMenuItems}
                />
            </div>
        </div>
        <div>
            <input
                className='bg-transparent outline-0'
                placeholder='Name'
                value={taskSelected.name}
                onChange={(e) => fieldUpdate(taskSelected.id, e.target.value, "name")}
                autoFocus>
            </input>
        </div>
        <div className="h-full w-full">
            <textarea
                className="h-full w-full bg-transparent resize-none outline-none"
                value={taskSelected.desc}
                placeholder="Description"
                onChange={(e) => fieldUpdate(taskSelected.id, e.target.value, "desc")}>
            </textarea>
        </div>
    </div>
  )
}

export default ItemDesc
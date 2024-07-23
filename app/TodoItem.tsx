import React, { useState } from 'react'
import ContextMenu from './ContextMenu';

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
    task: Task;
    taskSelectedID: number | null;
    deleteTask: Function;
    fieldUpdate: Function;
    handleSelection: Function;
    contextMenuUpdate: Function;
}

const TodoItem: React.FC<componentProps> = ({task, taskSelectedID, deleteTask, fieldUpdate, handleSelection, contextMenuUpdate}) => {
    const [contextMenu, setContextMenu] = useState(null);
    const handleRightClick = (event: { preventDefault: () => void; pageX: any; pageY: any; }) => {
      event.preventDefault();
      setContextMenu({
          position: {x: event.pageX, y: event.pageY},
          items: [
          {label: 'Date', onClick: () => alert(task.date?.toString())},
          {label: 'Priority', onClick: () => alert(task.taskPriority.toString())},
          {label: 'Delete', onClick: () => deleteTask(task.id)},
          ],
      });
      contextMenuUpdate(true);
    };
    
    const handleOutsideClick = () => {
        setContextMenu(null)
        contextMenuUpdate(false)
    }

    return (
    <div className={`px-2 py-1 my-2 rounded-md ${task.id === taskSelectedID ? 'bg-neutral-700' : 'bg-neutral-500'}`} onClick={() => {handleSelection(task.id); handleOutsideClick();}} onContextMenu={handleRightClick}>
        {contextMenu && (
            <ContextMenu
              position={contextMenu.position}
              items={contextMenu.items}
              onClose={handleOutsideClick}
            />
        )}
        <div className='flex flex-row'>
            <label>
                <input 
                    className={`w-4 h-4 mt-2 ml-1 appearance-none border-2 rounded-[4px] bg-transparent checked:appearance-auto checked:accent-gray-500 cursor-pointer
                        ${task.taskPriority === 1 ? 'border-red-500' : null}
                        ${task.taskPriority === 2 ? 'border-yellow-500' : null}
                        ${task.taskPriority === 3 ? 'border-blue-500' : null}
                        ${task.taskPriority === 4 ? 'border-neutral-500' : null}`}
                    type="checkbox"
                    checked={task.completed} 
                    onChange={() => fieldUpdate(task.id, task.completed, "completed")}
                />
            </label>
            <input className='ml-2 bg-transparent outline-0'
                value={task.name}
                placeholder='Task Name'
                onChange={(e) => fieldUpdate(task.id, e.target.value, "name")}
                autoFocus>
            </input>
        </div>
    </div>
    )
}

export default TodoItem
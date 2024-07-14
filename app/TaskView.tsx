'use client'
import React from 'react'
import { useState } from "react";
import TodoItem from "./TodoItem";
import ContextMenu from "./ContextMenu";
import ItemDesc from "./ItemInfo";

const TaskView = () => {
    interface Task {
        id: Number;
        name: string;
        completed: boolean;
        taskPriority: Number;
        date: Date | null;
        taskDesc: String;
        subTasks: Number[];
    }
    
    const dummyTask: Task = {
      id: 0,
      name: '',
      completed: false,
      taskPriority: 0,
      date: null,
      taskDesc: '',
      subTasks: []
    }

    const [tasks, setTasks] = useState<Task[]>([])

    const [text, setText] = useState('');
    const [taskSelected, setTaskSelected] = useState<Task>(dummyTask);

    function addTask(name: string) {
    const newTask = {
      id: Date.now(),
      name,
      completed: false,
      taskPriority: 4,
      date: null,
      taskDesc: '',
      subTasks: [],
    };
    if (text !== '') {
      setTasks([...tasks, newTask])
      setText('');
      console.log(newTask.id.toString())
    }
    }

    function deleteTask(id: number) {
      setTasks(tasks.filter((task) => task.id !== id));
      if (taskSelected.id === id) {
        setTaskSelected(dummyTask);
      }
    }

    function toggleCompleted(id: number) {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
          return {...task, completed: !task.completed};
      } else {
          return task;
      } 
      }));
    }

    function nameUpdate(id: number, newName: string) {
      const updatedTodos = tasks.map((task) => 
        task.id === id ? { ...task, name: newName } : task
      );
      setTasks(updatedTodos);
    };

    function handleSelection(selectedTaskID: Number) {
      const SelectedTask = tasks.find((task: Task) => task.id === selectedTaskID)
      if (SelectedTask !== undefined) {
        setTaskSelected(SelectedTask)
      }
    }
    
    const [contextMenu, setContextMenu] = useState(null);
    function handleRightClick(event: { preventDefault: () => void; pageX: any; pageY: any; }) {
    event.preventDefault();
    setContextMenu({
        position: {x: event.pageX, y: event.pageY},
        items: [
        {label: 'Date', onClick: () => alert('One!!!')},
        {label: 'Priority', onClick: () => alert('Two!!!')},
        {label: 'Delete', onClick: () => alert('Three!!!')},
        //{label: '', onClick: () => function()},
        ],
    });
    };
    
    function handleOutsideClick() {
        setContextMenu(null);
    }

    return (
        <div className="h-screen w-full flex flex-row" onContextMenu={handleRightClick} onClick={handleOutsideClick}>
        {contextMenu && (
            <ContextMenu
              position={contextMenu.position}
              items={contextMenu.items}
              onClose={handleOutsideClick}
            />
        )}
        <div id="MainContent" className="h-full w-full bg-neutral-600 flex flex-row justify-between">
          <div className="h-full w-1/2 bg-neutral-800 border-r-2 border-black">
            <div className="h-full w-full px-3 py-3">
              <input className="w-full rounded-md px-2 py-2 bg-black" 
                placeholder="Add Task..."
                value={text} 
                onChange={e => setText(e.target.value)}
                onKeyDown={(event) => event.key === 'Enter' ? addTask(text) : null}
              />
              {tasks.map((task) => (
                <TodoItem
                  task={task}
                  taskSelected={taskSelected}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                  nameUpdate={nameUpdate}
                  handleSelection={handleSelection}
                />
                ))
              }
            </div>
          </div>
          <div id="ItemInfo" className="h-full w-1/2 bg-neutral-800">
            {taskSelected.id !== 0 ? (
              <ItemDesc 
              taskSelected={taskSelected}
              toggleCompleted={toggleCompleted}
              nameUpdate={nameUpdate}
              />
            ):(
              null
            )}
          </div>
        </div>
    </div>
  )
}

export default TaskView
'use client'
import React from 'react'
import { useState } from "react";
import TodoItem from "./TodoItem";
import ContextMenu from "./ContextMenu";
import ItemDesc from "./ItemInfo";

const TaskView = () => {
    interface Task {
        id: number;
        name: string;
        completed: boolean;
        taskPriority: number;
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
    const [taskSelected, setTaskSelected] = useState<Task>(dummyTask);
    const [text, setText] = useState<string>('');

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
        alert("Before the update: " + taskSelected.id.toString());
        setTaskSelected(dummyTask);
        alert("After the update: " + taskSelected.id.toString());
      }
    }

    function toggleCompleted(id: number) {
      const updatedTodos = tasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTodos);
    }

    function nameUpdate(id: number, newName: string) {
      const updatedTodos = tasks.map((task) => 
        task.id === id ? { ...task, name: newName } : task
      );
      setTasks(updatedTodos);
    };

    function dateUpdate(id: number, newDate: Date | null) {
      const updatedTodos = tasks.map((task) => 
        task.id === id ? { ...task, date: newDate } : task
      );
      setTasks(updatedTodos);
    }

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
        {label: 'Date', onClick: () => alert(taskSelected.id)},
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
                  key={task.id}         
                  taskSelectedID={taskSelected.id}
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
            { taskSelected.id !== 0 ? (
              <ItemDesc 
              taskSelected={taskSelected}
              toggleCompleted={toggleCompleted}
              nameUpdate={nameUpdate}
              dateUpdate={dateUpdate}
              />
            ):(
              null
            )
            }
          </div>
        </div>
    </div>
  )
}

export default TaskView
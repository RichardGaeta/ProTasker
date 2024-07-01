'use client'
import Link from "next/link";
import { useState } from "react";
import TodoItem from "./TodoItem";
import ContextMenu from "./ContextMenu";

export default function Home() {
  interface Task {
    id: Number;
    text: String;
    completed: Boolean;
    taskPriority: Number;
    taskDesc: String;
    subTasks: Number[];
  }
  const [tasks, setTasks] = useState<Task[]>([])

  const [text, setText] = useState('');
  function addTask(text: string) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      taskPriority: 4,
      taskDesc: '',
      subTasks: [],
    };
    if (text !== '') {
      setTasks([...tasks, newTask])
      setText('');
    }
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
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

  function handleKeyDown(event: { key: string; }) {
    if (event.key === "Enter") {
      addTask(text)
    }
  }

  function handleUpdate(id: number, newText: string) {
    const updatedTodos = tasks.map((task) => 
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTodos);
  };

  const [contextMenu, setContextMenu] = useState(null);
  function handleRightClick(event: { preventDefault: () => void; pageX: any; pageY: any; }) {
    event.preventDefault();
    setContextMenu({
      position: {x: event.pageX, y: event.pageY},
      items: [
        {label: 'First One', onClick: () => alert('Yippi!!!')},
        {label: 'Second One', onClick: () => alert('Yippi Two!!!')},
        {label: 'Third One', onClick: () => alert('Yippi Three!!!')},
        //{label: '', onClick: () => function()},
      ],
    });
  };

  function handleOutsideClick() {
    setContextMenu(null);
  }

  return (
    <div className="h-screen flex flex-row" onContextMenu={handleRightClick} onClick={handleOutsideClick}>
      {contextMenu && (
          <ContextMenu
            position={contextMenu.position}
            items={contextMenu.items}
            onClose={handleOutsideClick}
          />
      )}
      <div id="SideBar" className="w-32 h-full bg-neutral-900 flex flex-col justify-between *:px-4 *:py-4">
        <div className="flex flex-col *:py-1">
          <Link href="">TaskView</Link>
          <Link href="">HabitTracker</Link>
          <Link href="">Notes</Link>
        </div>
        <div>
        <Link href="">Settings</Link>
        </div>
      </div>
      <div id="MainContent" className="h-full w-full bg-neutral-600 flex flex-row justify-between">
        <div className="h-full w-1/2 bg-neutral-800 border-r-2 border-black">
          <div className="h-full w-full px-3 py-3">
            <input className="w-full rounded-md px-2 py-2 bg-black" 
              placeholder="Add Task..."
              value={text} 
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {tasks.map((task) => (
              <TodoItem
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              handleUpdate={handleUpdate}
              />
              ))
            }
          </div>
        </div>
        <div className="h-full w-1/2 bg-neutral-800">
          <div className="h-full w-full px-2 py-2">

          </div>
        </div>
      </div>
    </div>
  );
}

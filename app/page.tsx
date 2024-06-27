'use client'
import Link from "next/link";
import { useState } from "react";
import TodoItem from "./TodoItem";

export default function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Test1',
      completed: true
    }
  ])

  const [text, setText] = useState('');
  function addTask(text: string) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    if (text !== '') {
      setTasks([...tasks, newTask])
      setText('');
    }
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id: number) {
    setTasks(tasks.map(task => {
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

  const handleUpdate = (id: number, newText: string) => {
    const updatedTodos = tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTodos);
  };

  return (
    <div className="h-screen flex flex-row">
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
            {tasks.map(task => (
            <TodoItem
            key={task.id} 
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            handleUpdate={handleUpdate}
            />
            ))}
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

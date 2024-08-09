'use client'
import { useState } from "react";
import { Task } from './Task';
import TodoItem from "./TodoItem";
import ItemDesc from "./ItemInfo";
import Dropdown from './Dropdown';
import dayjs from "dayjs";

const TaskView = () => {
    
  const dummyTask: Task = {
    id: 0,
    name: '',
    completed: false,
    taskPriority: 1,
    date: null,
    desc: '',
    subTasks: []
  }

  const [tasks, setTasks] = useState<Task[]>([])
  const [taskSelected, setTaskSelected] = useState<Task>(dummyTask);
  const [text, setText] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('name');
  const [contextMenuVisable, setContextMenuVisable] = useState<boolean>(false);

  const addTask = (name: string) => {
    const newTask = {
      id: Date.now(),
      name,
      completed: false,
      taskPriority: 1,
      date: null,
      desc: '',
      subTasks: [],
    };
    if (text !== '') {
      setTasks([...tasks, newTask])
      setText('');
    }
  }

  const deleteTask = (id: number) => {
    setTaskSelected(prevState => ({...prevState, id: 0}));
    setTasks(tasks.filter((task) => task.id !== id));
    taskSelected.id === id ? setTaskSelected(dummyTask) : null;
  }

  const fieldUpdate = (id: number, newValue: any, fieldType: string) => {
    if (fieldType === "name") {
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, name: newValue } : task));
      setTaskSelected(prevState => ({ ...prevState, name: newValue }));
    }
    else if (fieldType === "completed") {
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
      setTaskSelected(prevState => ({ ...prevState, completed: !prevState.completed }));
    }
    else if (fieldType === "priority") {
      alert("Priority was changed to " + newValue.toString())
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, taskPriority: newValue } : task));
      setTaskSelected(prevState => ({ ...prevState, taskPriority: newValue }));
    }
    else if (fieldType === "date") {
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, date: newValue } : task));
      setTaskSelected(prevState => ({ ...prevState, date: newValue }));
    }
    else if (fieldType === "desc") {
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, desc: newValue } : task));
      setTaskSelected(prevState => ({ ...prevState, desc: newValue }));
    }
  }

  const handleSelection = (selectedTaskID: Number) => {
    if (contextMenuVisable === false) {
      const SelectedTask = tasks.find((task: Task) => task.id === selectedTaskID)
      if (SelectedTask !== undefined) {
        setTaskSelected(SelectedTask)
      }
    }
  }
  
  const contextMenuUpdate = (isVisible: boolean) => {
    setContextMenuVisable(isVisible)
  }

  const isToday = (date: Date | null) => dayjs(date).isSame(dayjs(), 'day');
  const isThisWeek = (date: Date | null) => dayjs(date).isSame(dayjs(), 'week');
  const isThisMonth = (date: Date | null) => dayjs(date).isSame(dayjs(), 'month');

  const sortByName = (tasks: { name: string; }[]) => tasks.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
  const sortByDate = (tasks: { date: Date | null; }[]) => tasks.sort((a: { date: Date | null; }, b: { date: Date | null; }) => dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1);
  const sortByPriority = (tasks: any[]) => {
    return tasks.sort((a: { taskPriority: number; }, b: { taskPriority: number; }) => a.taskPriority - b.taskPriority);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'daily') return isToday(task.date);
    if (filter === 'weekly') return isThisWeek(task.date);
    if (filter === 'monthly') return isThisMonth(task.date);
    return true;
  });

  let sortedTasks;
    if (sort === 'name') {
      sortedTasks = sortByName([...filteredTasks]);
    } else if (sort === 'date') {
      sortedTasks = sortByDate([...filteredTasks]);
    } else if (sort === 'priority') {
      sortedTasks = sortByPriority([...filteredTasks]);
  }

  const SortMenuItems = [
    {label: 'Name', onClick: () => setSort('name')},
    {label: 'Date', onClick: () => setSort('date')},
    {label: 'Priority', onClick: () => setSort('priority')},
  ]

  const FilterMenuItems = [
    {label: 'Daily', onClick: () => setFilter('daily')},
    {label: 'Weekly', onClick: () => setFilter('weekly')},
    {label: 'Monthly', onClick: () => setFilter('monthly')},
    {label: 'All', onClick: () => setFilter('all')},
  ]

  return (
    <div className="h-screen w-full flex flex-row">
      <div id="MainContent" className="h-full w-full bg-neutral-600 flex flex-row justify-between">
        <div className="h-full w-1/2 bg-neutral-800 border-r-2 border-black">
          <div className="h-full w-full px-3 py-3">
            <div className='flex flex-row justify-between pb-2'>
              <h1>Today</h1>
              <div>
                <Dropdown
                  name={"Filter"}
                  items={FilterMenuItems}
                  divAdjust={""}
                  btnAdjust={""}
                  nameChange={false}
                />
                <Dropdown
                  name={"Sort"}
                  items={SortMenuItems}
                  divAdjust={"ml-1"}
                  btnAdjust={""} nameChange={false}
                />
              </div>
            </div>
            <input className="w-full rounded-md px-2 py-2 bg-black" 
              placeholder="Add Task..."
              value={text} 
              onChange={e => setText(e.target.value)}
              onKeyDown={(event) => event.key === 'Enter' ? addTask(text) : null}
            />
            
            {sortedTasks.map((task: any) => ( //Possibly Undefined since of the sortByDate
              <TodoItem
                task={task}
                key={task.id}         
                taskSelectedID={taskSelected.id}
                deleteTask={deleteTask}
                fieldUpdate={fieldUpdate}
                handleSelection={handleSelection}
                contextMenuUpdate={contextMenuUpdate}
              />
              ))
            }
          </div>
        </div>
        <div id="ItemInfo" className="h-full w-1/2 bg-neutral-800">
          { taskSelected.id !== 0 &&
            <ItemDesc 
              taskSelected={taskSelected}
              fieldUpdate={fieldUpdate}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default TaskView
import React, { useState } from 'react'
import Dropdown from '../Dropdown'
import { Habit } from './Habit';

interface componentProps {
  habit: Habit;
  editMode: boolean;
  createHabit: Function;
  editHabit: Function;
  showCreateMenu: Function;
}

const HabitAddMenu: React.FC<componentProps> = ({habit, editMode, createHabit, editHabit, showCreateMenu}) => {
  const [name, setName] = useState<string>("")
  const [category, setCategory] = useState<string>("None")
  const [interval, setInterval] = useState<boolean[]>([false, false, false, false, false, false, false])

  const CategoryMenuItems = [
    {label: 'None', onClick: () => setCategory("None")},
    {label: 'Morning', onClick: () => setCategory("Morning")},
    {label: 'Afternoon', onClick: () => setCategory('Afternoon')},
    {label: 'Night', onClick: () => setCategory('Night')},
  ]

  const handleToggle = (index: number) => {
    const newInterval = [...interval];
    newInterval[index] = !newInterval[index];
    setInterval(newInterval);
  }

  const ConfirmBtn = () => {
    if (name === "") {return}
    editMode ? editHabit(habit.id, name, category, interval) : createHabit(name, category, interval);
    setName("")
    setCategory("None")
    setInterval([false, false, false, false, false, false, false])
    showCreateMenu(false)
  }

  const CancelBtn = () => {
    setName("")
    setCategory("None")
    setInterval([false, false, false, false, false, false, false])
    showCreateMenu(false);
  }

  if (editMode) {
    setName(habit.name)
    setCategory(habit.category)
    setInterval(habit.interval)
  }

  return (
    <div className='w-full lg:w-1/2 lg:float-right h-fit my-2 bg-neutral-700 border border-neutral-600 px-4 py-2 rounded-md'>
      {
        editMode
        ? <h1 className='text-center font-bold mb-2'>Edit Habit</h1>
        : <h1 className='text-center font-bold mb-2'>Create Habit</h1>
      }
      <label className=''>Name:</label>
      <input type='text'
        className='w-full text-black px-2 outline-none' 
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <label className=''>Category:</label>
      <Dropdown
        name={'None'}
        items={CategoryMenuItems}
        divAdjust={'w-full z-[100]'}
        btnAdjust={'text-right pr-3 py-[1px] bg-neutral-700 border border-neutral-500'}
        nameChange={true}
      />
      <label className=''>Interval:</label>
      <div className='w-full flex flex-row justify-between *:px-1 *:border-[1px] *:border-neutral-500'>
        <button className={`${interval[0] ? 'bg-blue-500' : 'bg-neutral-700'}`} onClick={() => handleToggle(0)}>Sun</button>
        <button className={`${interval[1] ? 'bg-blue-500' : 'bg-neutral-700'}`} onClick={() => handleToggle(1)}>Mon</button>
        <button className={`${interval[2] ? 'bg-blue-500' : 'bg-neutral-700'}`} onClick={() => handleToggle(2)}>Tue</button>
        <button className={`${interval[3] ? 'bg-blue-500' : 'bg-neutral-700'}`} onClick={() => handleToggle(3)}>Wed</button>
        <button className={`${interval[4] ? 'bg-blue-500' : 'bg-neutral-700'}`} onClick={() => handleToggle(4)}>Thu</button>
        <button className={`${interval[5] ? 'bg-blue-500' : 'bg-neutral-700'}`} onClick={() => handleToggle(5)}>Fri</button>
        <button className={`${interval[6] ? 'bg-blue-500' : 'bg-neutral-700'}`} onClick={() => handleToggle(6)}>Sat</button>
      </div>
      <div className='mt-4 flex flex-row'>
        <button
          className='w-1/2 px-2 py-2 rounded-md border border-neutral-500 bg-blue-500'
          onClick={ConfirmBtn}
        >Confirm</button>
        <button
          className='w-1/2 px-2 py-2 rounded-md border border-neutral-500'
          onClick={CancelBtn}
        >Cancel</button>
      </div>
    </div>
  )
}

export default HabitAddMenu
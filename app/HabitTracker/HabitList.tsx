'use client'
import React, { useState } from 'react'
import CreateHabitMenu from './CreateHabitMenu';
import HabitSection from './HabitSection';
import { Habit } from './Habit';
import EditHabitMenu from './EditHabitMenu';

const HabitList = () => {
  const dummyHabit = {
    id: 0,
    name: "",
    category: "None",
    completed: [],
    streak: 0,
    interval: [false, false, false, false, false, false, false],
  }

  const [Habits, setHabits] = useState<Habit[]>([]);
  const [showCreateMenu, setShowCreateMenu] = useState<boolean>(false);
  const [showEditMenu, setShowEditMenu] = useState<boolean>(false);
  const [habitSelected, setHabitSelected] = useState<Habit>(dummyHabit);

  const NoneHabits = Habits.filter((Habit) => Habit.category === "None")
  const MorningHabits = Habits.filter((Habit) => Habit.category === "Morning")
  const AfternoonHabits = Habits.filter((Habit) => Habit.category === "Afternoon")
  const NightHabits = Habits.filter((Habit) => Habit.category === "Night")
  
  const createHabit = (habitName: string, habitCategory: string, habitInterval: boolean[]) => {
    const newHabit = {
      id: Date.now(),
      name: habitName,
      category: habitCategory,
      completed: [],
      streak: 0,
      interval: habitInterval,
    }
    setHabits([...Habits, newHabit]);
  }

  const editHabit = (id: number) => {
    setHabitSelected(Habits.find((habit) => habit.id === id)!);
    setShowEditMenu(true);
  }

  const deleteHabit = (id: number) => {
    setHabits(prevState => ({...prevState, id: 0}));
    setHabits(Habits.filter((habit) => habit.id !== id));
  }

  const fieldUpdate = (id: number, newName: string, newCategory: string, newInterval: boolean[]) => {
    setHabits(prevHabits => prevHabits.map(habit => habit.id === id ? { ...habit, name: newName, category: newCategory, interval: newInterval } : habit));
  }

  const streakCalc = (id: number) => {
    const boolArray = Habits.find((habit) => habit.id === id);
    let currentStreak = 0;
    if (boolArray !== undefined) {
      for (let i = 0; i < boolArray.completed.length; i++) {
        boolArray.completed[i] ? currentStreak++ : currentStreak = 0
      }
    }
    setHabits(prevHabits => prevHabits.map(habit => habit.id === id ? { ...habit, streak: currentStreak } : habit));
  }

  const checkHabit = (id: number) => {
    setHabits(prevHabits => prevHabits.map(habit => habit.id === id ? { ...habit, completed: [...habit.completed, true] } : habit));
    streakCalc(id);
  }

  return (
    <div className='w-1/2 h-screen bg-neutral-800 border-r-2 border-black py-3 px-3'>
      <div className='w-full h-full'>
        <div className='flex flex-row justify-between'>
          <h1 className=''>Habits</h1>
          <button
            className='px-1 py-[1px] bg-neutral-600 rounded-md'
            onClick={() => setShowCreateMenu(true)}
          >Add Habit</button>
        </div>
        {showCreateMenu === true &&
          <CreateHabitMenu
            createHabit={createHabit}
            showCreateMenu={(input: boolean) => setShowCreateMenu(input)}
            habit={habitSelected}
          />
        }
        {showEditMenu === true &&
          <EditHabitMenu
            habit={habitSelected}
            fieldUpdate={fieldUpdate}
            showEditMenu={(input: boolean) => setShowEditMenu(input)}
          />
        }
        <div id='DaysOfWeekContainer' className='flex flex-row'>
          
        </div>
        <HabitSection sectionName={'None'} habitSection={NoneHabits} checkHabit={checkHabit} editHabit={editHabit} deleteHabit={deleteHabit} />
        <HabitSection sectionName={'Morning'} habitSection={MorningHabits} checkHabit={checkHabit} editHabit={editHabit} deleteHabit={deleteHabit} />
        <HabitSection sectionName={'Afternoon'} habitSection={AfternoonHabits} checkHabit={checkHabit} editHabit={editHabit} deleteHabit={deleteHabit} />
        <HabitSection sectionName={'Night'} habitSection={NightHabits} checkHabit={checkHabit} editHabit={editHabit} deleteHabit={deleteHabit} />
      </div>
    </div>
  )
}

export default HabitList
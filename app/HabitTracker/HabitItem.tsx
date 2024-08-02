import React from 'react'

interface Habit {
  id: number;
  name: string;
  category: string;
  completed: boolean[]
  streak: number;
  // frequency: TBD;
}

interface componentProps {
  habit: Habit;
}

const HabitItem: React.FC<componentProps> = ({habit}) => {
  return (
    <div className='w-full h-fit flex flex-row bg-neutral-700 px-2 rounded-md'>
      <div>
        <p>{habit.name}</p>
        <div className='flex flex-row'>
          <p className='mr-2'>Total: {habit.streak}</p>
          <p>Streak: {habit.streak}</p>
        </div>
      </div>
      <div className='w-full h-fit'>
        <button className='w-1/5 h-full bg-black float-right'>O</button>
      </div>
    </div>
  )
}

export default HabitItem
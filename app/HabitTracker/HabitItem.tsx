import React, { useState } from 'react'
import { Habit } from './Habit';
import ContextMenu from '../ContextMenu';

interface componentProps {
  habit: Habit;
  checkHabit: Function;
  deleteHabit: Function;
  editHabit: Function;
}

const HabitItem: React.FC<componentProps> = ({habit, checkHabit, deleteHabit, editHabit}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const handleRightClick = (event: { preventDefault: () => void; pageX: any; pageY: any; }) => {
    event.preventDefault();
    setContextMenu({
        position: {x: event.pageX, y: event.pageY},
        items: [
          {label: 'Edit', onClick: () => editHabit(habit.id)},
          {label: 'Delete', onClick: () => deleteHabit(habit.id)},
        ],
    });
  };
  
  const handleOutsideClick = () => {
      setContextMenu(null);
  }

  const habitTotal = habit.completed.filter(Boolean).length
  return (
    <div className='w-full h-full flex flex-row bg-neutral-700 px-3 py-[1px] rounded-md' onClick={() => {handleOutsideClick();}} onContextMenu={handleRightClick}>
      {contextMenu &&
            <ContextMenu
              position={contextMenu.position}
              items={contextMenu.items}
              onClose={handleOutsideClick}
            />
        }
      <div className='h-full w-1/2'>
        <h1 className='text-lg'>{habit.name}</h1>
        <div className='flex flex-row *:text-neutral-400'>
          <p className='mr-2'>Total: {habit.streak}</p>
          <p className=''>Streak: {habit.streak}</p>
        </div>
      </div>
      <div className='h=full w-1/2'>
        <button className='w-fit h-4/5 px-3 my-1 bg-black float-right rounded-lg' onClick={() => checkHabit(habit.id)}>
          O
        </button>
      </div>
    </div>
  )
}

export default HabitItem
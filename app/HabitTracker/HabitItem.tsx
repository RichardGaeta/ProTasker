import React, { useState } from 'react'
import { Habit } from './Habit';
import ContextMenu from '../ContextMenu';

interface componentProps {
  habit: Habit;
  deleteHabit: Function;
  editHabit: Function;
}

const HabitItem: React.FC<componentProps> = ({habit, deleteHabit, editHabit}) => {
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

  return (
    <div className='w-full h-fit flex flex-row bg-neutral-700 px-2 rounded-md' onClick={() => {handleOutsideClick();}} onContextMenu={handleRightClick}>
      {contextMenu &&
            <ContextMenu
              position={contextMenu.position}
              items={contextMenu.items}
              onClose={handleOutsideClick}
            />
        }
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
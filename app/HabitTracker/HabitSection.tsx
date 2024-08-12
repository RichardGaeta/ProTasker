import React from 'react'
import HabitItem from './HabitItem';
import { Habit } from './Habit';

interface componentProps {
  sectionName: string;
  habitSection: Habit[];
  checkHabit: Function;
  editHabit: Function;
  deleteHabit: Function;
}

const HabitSection: React.FC<componentProps> = ({sectionName, habitSection, checkHabit, editHabit, deleteHabit}) => {
  return (
    <div>
      {habitSection.length !== 0 &&
          <h1>{sectionName}</h1>
        }
        {habitSection.length !== 0 && 
          habitSection.map((Habit: any) => (
            <HabitItem
              habit={Habit}
              checkHabit={checkHabit}
              editHabit={editHabit}
              deleteHabit={deleteHabit}
            />
          ))
        }
    </div>
  )
}

export default HabitSection
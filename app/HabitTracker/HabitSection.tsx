import React from 'react'
import HabitItem from './HabitItem';

interface Habit {
  id: number;
  name: string;
  category: string;
  completed: boolean[]
  streak: number;
  // frequency: TBD;
}

interface componentProps {
  sectionName: string;
  habitSection: Habit[];
}

const HabitSection: React.FC<componentProps> = ({sectionName, habitSection}) => {
  return (
    <div>
      {habitSection.length !== 0 &&
          <h1>{sectionName}</h1>
        }
        {habitSection.length !== 0 && 
          habitSection.map((Habit: any) => (
            <HabitItem
              habit={Habit}
            />
          ))
        }
    </div>
  )
}

export default HabitSection
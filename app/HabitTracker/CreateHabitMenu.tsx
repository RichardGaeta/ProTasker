import React, { useState } from 'react'
import Dropdown from '../Dropdown'

interface componentProps {
  createHabit: Function;
  showCreateMenu: Function;
}

const HabitAddMenu: React.FC<componentProps> = ({createHabit, showCreateMenu}) => {
  const [name, setName] = useState<string>("")
  const [category, setCategory] = useState<string>("None")
  const [frequency, setFrequency] = useState<string>("Daily")

  const CategoryMenuItems = [
    {label: 'None', onClick: () => setCategory("None")},
    {label: 'Morning', onClick: () => setCategory("Morning")},
    {label: 'Afternoon', onClick: () => setCategory('Afternoon')},
    {label: 'Night', onClick: () => setCategory('Night')},
  ]

  const FrequencyMenuItems = [
    {label: 'Daily', onClick: () => setFrequency('Daily')},
    {label: 'Weekly', onClick: () => setFrequency("Weekly")},
    {label: 'Interval', onClick: () => setFrequency("Interval")},
  ]

  const ConfirmBtn = () => {
    createHabit(name, category, frequency);
    showCreateMenu(false)
  }

  const CancelBtn = () => {
    setName("")
    setCategory("None")
    setFrequency("Daily")
    showCreateMenu(false);
  }

  return (
    <div className='w-full lg:w-1/2 lg:float-right h-fit my-2 bg-neutral-700 border border-neutral-600 px-4 py-2 rounded-md'>
      <h1 className='text-center font-bold mb-2'>Create Habit</h1>
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
      <label className=''>Frequency:</label>
      <Dropdown
        name={'Daily'}
        items={FrequencyMenuItems}
        divAdjust={'w-full z-[90]'}
        btnAdjust={'text-right pr-3 py-[1px] bg-neutral-700 border border-neutral-500'}
        nameChange={true}
      />
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
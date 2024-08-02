'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div id="SideBar" className="w-1/8 h-full bg-neutral-900 flex flex-col justify-between *:px-4 *:py-4">
      <div className="flex flex-col *:py-1 hover:text-neutral-200">
        <Link className={`${pathname === "/" ? "text-neutral-500" : "hover:text-neutral-300"}`} href="/">TaskView</Link>
        <Link className={`${pathname === "/HabitTracker" ? "text-neutral-500" : "hover:text-neutral-300"}`} href="/HabitTracker">HabitTracker</Link>
        <Link className={`${pathname === "/Notes" ? "text-neutral-500" : "hover:text-neutral-300"}`} href="/Notes">Notes</Link>
      </div>
      <div>
        <button 
          className='hover:text-neutral-200'
        >Settings</button>
      </div>
    </div>
  )
}

export default Sidebar
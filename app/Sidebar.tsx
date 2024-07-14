import React from 'react'
import Link from "next/link";

const Sidebar = () => {
  return (
    <div id="SideBar" className="w-32 h-full bg-neutral-900 flex flex-col justify-between *:px-4 *:py-4">
      <div className="flex flex-col *:py-1">
        <Link href="">TaskView</Link>
        <Link href="">HabitTracker</Link>
        <Link href="">Notes</Link>
      </div>
      <div>
        <Link href="">Settings</Link>
      </div>
    </div>
  )
}

export default Sidebar
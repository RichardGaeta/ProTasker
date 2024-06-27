import React from 'react'

const ContextMenu = (position, items, onClose) => {
  return (
    <div className='absolute bg-white border-black shadow-md z-50' style={{top: position.y, left: position.x}} onClick={onClose}>
        {items.map((item, index) => (
            <div key={index} className='pt-2 pr-3 cursor-pointer hover:bg-slate-300' onClick={item.onClick}>
                {item.label}
            </div>
        ))}
    </div>
  )
}

export default ContextMenu
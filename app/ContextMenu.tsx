import React from 'react'

interface componentProps {
  position: any;
  items: any;
  onClose: any;
}

const ContextMenu: React.FC<componentProps> = ({position, items, onClose}) => {
  return (
    <div className='absolute bg-neutral-700 border-black shadow-md z-50 py-2 rounded-md' style={{top: position.y, left: position.x}} onClick={onClose}>
        {items.map((item: {label: String, onClick: React.MouseEventHandler<HTMLDivElement> | undefined}, index: React.Key | null | undefined) => (
            <div key={index} className='py-1 px-3 cursor-pointer rounded hover:bg-slate-600' onClick={item.onClick}>
                {item.label}
            </div>
        ))}
    </div>
  )
}

export default ContextMenu
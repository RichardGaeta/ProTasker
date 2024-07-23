import React, { useState } from 'react'

interface componentProps {
    name: string;
    items: any;
}

const Dropdown: React.FC<componentProps> = ({name, items}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleItemClick = (itemOnClick: any) => {
        itemOnClick()
        setIsOpen(!isOpen)
    }

    return (
        <div className='relative inline-block float-right ml-1'>
            <button className='bg-neutral-500 px-2 rounded-md' onClick={() => setIsOpen(!isOpen)}>
                {name}
            </button>
            {isOpen === true ? (
                <div className='absolute bg-white shadow-md right-0'>
                    {items.map((item: {label: string, onClick: React.MouseEventHandler<HTMLButtonElement> | undefined}, index: React.Key | null | undefined) => (
                        <button key={index} className='w-full block px-2 text-black text-left hover:bg-neutral-300' onClick={() => handleItemClick(item.onClick)}>
                            {item.label}
                        </button>
                    ))}
                </div>
            ) : (
                null
            )}
        </div>
  )
}

export default Dropdown
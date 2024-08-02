import React, { useState } from 'react'

interface componentProps {
    name: string;
    items: any;
    divAdjust: string;
    btnAdjust: string;
    nameChange: boolean;
}

const Dropdown: React.FC<componentProps> = ({name, items, divAdjust, btnAdjust, nameChange}) => {
    const [dropdownName, setDropdownName] = useState<string>(name)
    const [isOpen, setIsOpen] = useState(false)

    const handleItemClick = (itemOnClick: any, itemLabel: string) => {
        itemOnClick()
        setIsOpen(!isOpen)
        nameChange === true ? setDropdownName(itemLabel) : null
    }

    return (
        <div className={`relative inline-block ${divAdjust}`}>
            <button className={`w-full bg-neutral-500 px-2 rounded-md ${btnAdjust}`} onClick={() => setIsOpen(!isOpen)}>
                {dropdownName}
            </button>
            {isOpen === true ? (
                <div className='absolute bg-white shadow-md right-0'>
                    {items.map((item: {label: string, onClick: React.MouseEventHandler<HTMLButtonElement> | undefined}, index: React.Key | null | undefined) => (
                        <button key={index} className='w-full block px-2 text-black text-left hover:bg-neutral-300 z-10' onClick={() => handleItemClick(item.onClick, item.label)}>
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
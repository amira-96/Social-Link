import React from 'react'
import { Dropdown,DropdownItem, DropdownMenu,DropdownTrigger} from '@heroui/react'


export default function CardDropDown({onOpen,setIsInUpdateMode}) {
  return (
    <div>
        <  Dropdown>
      < DropdownTrigger>
 <svg className="w-fit rotate-90 outline-none cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round">
      <circle cx={12} cy={12} r={1} />
      <circle cx={19} cy={12} r={1} />
      <circle cx={5} cy={12} r={1} />
      </svg>
             </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onPress={()=>setIsInUpdateMode(true)} key="edit" className='text-sky-950 dark:text-sky-400'>Edit</DropdownItem>
        <DropdownItem  onPress={onOpen} key="delete" className="text-sky-950 dark:text-sky-400" color="default">
          Delete 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </div>
  )
}

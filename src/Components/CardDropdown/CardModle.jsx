import React from 'react'
import { Button,ModalContent,ModalBody,ModalHeader,Modal,ModalFooter} from '@heroui/react'

export default function CardModle({isOpen,onOpenChange, isLoading,deletFunction,title,descrption="Are you sure? you won't be able to  revert this!"}) {
  return (
    <div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {title&& <ModalHeader className="flex flex-col gap-1 text-sky-950 dark:text-sky-500">{title}</ModalHeader>}
              <ModalBody>
                <p className='text-sky-700 dark:text-sky-600'>{descrption} </p>
               
                </ModalBody>
              <ModalFooter>
                <Button color="default" className='bg-sky-950 text-sky-400 dark:bg-sky-400 dark:text-sky-950'  variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button  color="danger" className='bg-sky-950 text-sky-400 dark:bg-sky-400 dark:text-sky-950' variant='light'  isLoading={isLoading} onPress={()=>deletFunction(onClose)}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    
    </div>
  )
}

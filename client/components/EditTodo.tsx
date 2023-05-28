import React, { useState, useRef } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl
} from '@chakra-ui/react'

interface EditTodoProps {
    todo: any,
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

const EditTodo = ({ todo, isOpen, onOpen, onClose }: EditTodoProps) => {

    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [editTodoName, setEditTodoName] = useState<string>(todo.description)


    console.log("editTodoName: ", editTodoName)
    console.log("todo description:", todo.description)

    // update todo
    const updateDescription = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const body = { description: editTodoName }
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json " },
                body: JSON.stringify(body)
            })
            const win: Window = window; // trying to do window.location but TS does not allow this (ref: https://github.com/microsoft/TypeScript/issues/48949)
            win.location = "/";
        } catch (e: any) {
            console.error(e.message)
        }
    }


    return (

        <Modal isOpen={isOpen} onClose={() => {
            onClose();
            setEditTodoName(todo.description)
        }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Todo Name</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input placeholder='Edit your Todo item...' value={editTodoName} onChange={(e) => setEditTodoName(e.target.value)} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={(e) => updateDescription(e)}>
                        Edit
                    </Button>
                    <Button variant='ghost' onClick={() => {
                        onClose();
                        setEditTodoName(todo.description);
                    }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditTodo;


{/* <Modal isOpen={isOpen} onClose={onClose} >
<ModalOverlay />
<ModalContent>
    <ModalHeader>Edit Todo </ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <Input
            placeholder='Edit your Todo Item...'
            onChange={(e) => handleEditInputChange(e, todo.todo_id)}
        />
    </ModalBody>

    <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={(e) => handleEditSubmit(e)}>
            Edit
        </Button>
        <Button variant='ghost' onClick={onClose}>Cancel</Button>
    </ModalFooter>
</ModalContent>
</Modal > */}
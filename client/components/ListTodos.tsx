"use client"

import React, { useEffect, useState } from 'react';

import {
    HStack, VStack, Text, Flex, Badge, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Input, Divider
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const ListTodos = () => {

    const [todos, setTodos] = useState<Array<any>>([])

    // to get all todos and put it in VStack
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json() // as it takes time to parse the data as well

            setTodos(jsonData)
        } catch (e: any) {
            console.error(e.message)
        }
    }
    useEffect(() => {
        getTodos();
    }, [])


    //delete todo
    const deleteTodo = async (todo_id: Number) => {
        try {
            const deletedTodo = await fetch(`http://localhost:5000/todos/${todo_id}`, {
                method: "DELETE"
            })
            console.log(deletedTodo)
            setTodos(todos.filter(todo => todo.todo_id !== todo_id)) // to make sure the deleted todo disappears from screen w/o refreshing

        } catch (e: any) {
            console.error(e.message)
        }
    }


    return (
        <>
            <h1>List Todos</h1>

            <VStack>
                {todos.map((todo) => (

                    <HStack spacing="24px" w="320px" key={todo.todo_id}>
                        <Flex p={6} w="300px" h="50px" justifyContent="space-between">

                            <Text>{todo.description}</Text>
                            <Flex w="10px" >

                                <DeleteIcon color="red.500" mr="2" onClick={() => deleteTodo(todo.todo_id)} />
                                <EditIcon />

                            </Flex>


                            {/* <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit Your Todo</ModalHeader>
                                    <ModalCloseButton />
                                    <form onSubmit={handleEditSubmit}>
                                        <ModalBody>
                                            <Input
                                                value={modalValue.text}
                                                key={modalValue.id}
                                                variant="outline"
                                                type="text"
                                                placeholder="Update your todo..."
                                                onChange={handleEditInputChange} />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="teal" mr={3} onClick={onClose}>
                                                Close
                                            </Button>
                                            <Button type="submit" colorScheme="teal" mr={3}>
                                                Update
                                            </Button>
                                        </ModalFooter>
                                    </form>

                                </ModalContent>
                            </Modal> */}


                        </Flex>

                    </HStack>

                ))}

            </VStack>
        </>


    );

};

export default ListTodos;

"use client"

import React from 'react';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
} from '@chakra-ui/react'
import { Field, Form, Formik, FieldInputProps, FormikProps, FormikValues } from 'formik';

const InputTodo = () => {

    function validateName(value: String) {
        let error
        if (!value) {
            error = 'Input is required'
        }
        return error
    }
    return (
        <>
            <Flex bg="gray.100" align="center" justify="center" h="100vh">
                <Box bg="white" p={6} rounded="md" w={64}>
                    <Formik
                        initialValues={{
                            todoItem: ""
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2))
                                actions.setSubmitting(false)
                            }, 1000)
                        }}
                    >
                        {(props: FormikValues) => (
                            <Form>
                                <Field name='todoItem' validate={validateName}>
                                    {({ field, form }: { field: FieldInputProps<string>, form: FormikProps<{ name: string, surname: string }> }) => (
                                        <FormControl isInvalid={!!form.errors.name && form.touched.name}>
                                            <FormLabel>Todo List</FormLabel>
                                            <Input {...field} placeholder='Enter an item...' />
                                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={props.isSubmitting}
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>

        </>
    );
};

export default InputTodo;


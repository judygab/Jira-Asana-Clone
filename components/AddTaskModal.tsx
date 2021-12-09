import React, { useState } from 'react';
import { Col, Button, Card, Form, Container, Modal } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`

const CreateTaskMutation = gql`
  mutation CreateTask($id: String, $title: String!, $description: String!, $status: String!) {
    createTask(id: $id, title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`

const AddTaskModal = ({
    boardCategory,
    showModal,
    handleClose,
  }: {
    boardCategory: string;
    showModal: boolean;
    handleClose: () => void;
  }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [createTask, { data, loading, error }] = useMutation(CreateTaskMutation);

  const handleTaskCreate = (e) => {
    e.preventDefault();
    createTask({ variables: { title: taskTitle, description: taskDescription, status: boardCategory  },
      update: (cache, { data: { addItem } }) => {
        const data : any = cache.readQuery({ query: AllTasksQuery });
        const updatedTasks = [...data.tasks, createTask];
        cache.writeQuery({
          query: AllTasksQuery,
          data: {tasks: updatedTasks}
        });
      }
    });
    handleClose();
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleTaskCreate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" style={{ height: '100px'}} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assign To</Form.Label>
            <Form.Select aria-label="Assign To">
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default AddTaskModal;

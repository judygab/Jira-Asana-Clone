import React, { useState } from 'react';
import { Col, Button, Card, Form, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import TaskComponent from './TaskComponent';
import { Droppable } from 'react-beautiful-dnd';

const CreateTaskMutation = gql`
  mutation CreateTask($id: String, $title: String!, $description: String!) {
    createTask(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`

interface BoardSectionProps {
  title: string
  tasks: any
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [createTask, { data, loading, error }] = useMutation(CreateTaskMutation);

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  const handleTaskCreate = (e) => {
    e.preventDefault();
    createTask({ variables: { title: taskTitle, description: taskDescription  } });
    handleClose();
  }

  return (
    <>
      <Col md={3} className="d-flex flex-column p-2">
        <div className="board-section-header d-flex flex-row align-items-center">
          <h3 className="me-auto">{title}</h3>
          <FontAwesomeIcon icon={faPlus} style={{'color': '#6f7782'}}/>
        </div>
        <Droppable droppableId={title}>
          {(provided) => (
            <Container
              className="p-0 d-flex flex-column h-100"
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
            {tasks &&
              tasks.map((task: Task, index: number) => {
                return (
                  <TaskComponent
                   title={task.title}
                   description={task.description}
                   id={task.id}
                   key={task.id}
                   index={index}
                   />
                )
              })}
              {tasks.length > 0 &&
                <Button className="add-wrapper" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} style={{'padding': '2px'}}/>
                  Add task
                </Button>
              }
            { tasks.length === 0 &&
              <div className="is-empty d-flex flex-column">
                <Button className="add-wrapper" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} style={{'padding': '2px'}}/>
                  Add task
                </Button>
              </div>
            }
            {provided.placeholder}
            </Container>)}
        </Droppable>
      </Col>
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
    </>
  );
}

export default BoardSection;

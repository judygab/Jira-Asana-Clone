import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import BoardSection from '../components/BoardSection';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSession } from "next-auth/react";

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

const GetUserQuery = gql`
  query($email: String!) {
    user(email: $email) {
      id
      name
      tasks {
        id
        title
        description
        status
      }
    }
  }
`

const UpdateTaskMutation = gql`
  mutation UpdateTaskMutation($id: String!, $title: String, $description: String, $userId: String, $status: String) {
    updateTask(description: $description, id: $id, title: $title, userId: $userId, status: $status) {
      id
      title
      description
      status
    }
  }
`

const Board = () => {
  const { data, loading, error } = useQuery(AllTasksQuery, {
    onCompleted: data => {
      console.log(data.tasks)
      setTasks(data.tasks)
    }
  });
  const [updateTask] = useMutation(UpdateTaskMutation);
  const { data: session, status } = useSession()
  const [getTasks, { data: tasksData, loading: tasksLoading, error: tasksError }] = useLazyQuery(GetUserQuery);
  const [tasks, setTasks] = useState([]);
  const sections: Array<String> = ['Backlog', 'In-Progress', 'Review', 'Done'];

  useEffect(() => {
    if (session) {
      getTasks({ variables: { email: session.user.email }});
    }
  }, [session])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  // if (tasksLoading) return <p>Loading...</p>
  // if (tasksError) return <p>Oh no... {tasksError.message}</p>

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if ( destination.droppableId === source.droppableId ) {
      return;
    }

    const updatedTasksList = tasks && tasks.map((t: any) => {
      if (t.id === draggableId) {
        return {
          ...t,
          status: destination.droppableId
        }
      } else {
        return t;
      }
    })
    setTasks(updatedTasksList);

    updateTask({
      variables: {
        id: draggableId,
        status: destination.droppableId,
      },
    update: (cache, { data }) => {
      const existingTasks : any = cache.readQuery({
        query: AllTasksQuery
      });
      const updatedTasks = existingTasks!.tasks.map((t: any) => {
        if (t.id === draggableId) {
          return {
            ...t,
            ...data!.updateTask! };
          } else {
            return t;
          }
        }
      );
      cache.writeQuery({
        query: AllTasksQuery,
        data: {tasks: updatedTasks}
      });
      const dataInCache = cache.readQuery({ query: AllTasksQuery});
      console.log(dataInCache);
    },
    onCompleted: data => {
      // setTasks(data.tasks)
    }
  })
  }

  const reFetchTasks = () => {
    if (session) {
      getTasks({ variables: { email: session.user.email }});
    }
  }

  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project Title</h1>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container d-flex flex-row flex-grow-1">
          {sections.map((section, index) => {
            let filteredData: Array<Task> = tasksData ? tasksData.user.tasks.filter((task: Task) => {return task.status === section}) : [];
            return (
              <BoardSection
                title={section}
                key={index}
                tasks={filteredData}
                reFetchTasks={reFetchTasks}
                ></BoardSection>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;

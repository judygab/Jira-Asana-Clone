import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Task {
    id: String
    createdAt: Date
    updatedAt: DateTime
    title: String
    description: String
    url: String
    status: String
    userId: String
  }

  type Query {
    tasks: [Task]
  }
`;

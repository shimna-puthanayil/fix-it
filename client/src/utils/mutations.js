import { gql } from "@apollo/client";
// Mutation to add a property
export const ADD_PROPERTY = gql`
  mutation AddProperty($propertyDetails: propertyInput) {
    addProperty(propertyDetails: $propertyDetails) {
      _id
    }
  }
`;
// Mutation to add a new complaint
export const ADD_COMPLAINT = gql`
  mutation AddComplaint($complaint: String!) {
    addComplaint(complaint: $complaint) {
      _id
    }
  }
`;
//Mutation to add a new user
export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $password: String!
    $email: String!
    $role: String!
  ) {
    addUser(
      username: $username
      password: $password
      email: $email
      role: $role
    ) {
      token
      user {
        _id
        role
      }
    }
  }
`;

// Mutation for user login
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        role
      }
    }
  }
`;
// Mutation to add a new complaint
export const UPDATE_COMPLAINT = gql`
  mutation UpdateComplaint(
    $quotes: String!
    $complaintId: String!
    $status: String
  ) {
    updateComplaint(
      quotes: $quotes
      complaintId: $complaintId
      status: $status
    ) {
      _id
    }
  }
`;

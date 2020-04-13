import gql from 'graphql-tag';

export default gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
    ) {
      id
    }
  }
`;

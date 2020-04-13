import gql from 'graphql-tag';

export default gql`
  query getPerson($id: String!) {
    getPerson(id: $id) {
      lastName
      firstName
      email
      phoneNumber
    }
  }
`;

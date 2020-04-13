import gql from 'graphql-tag';

export default gql`
  mutation updateUser($id: String!, $input: input!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`;

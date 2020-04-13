import gql from 'graphql-tag';

export default gql`
  {
    getPeople {
      id
      firstName
      lastName
      email
    }
  }
`;

import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getPeople } from '../gql/query';
import { deleteUser } from '../gql/mutation';

const Wrapper = styled.div`
  .add-user {
    text-align: right;
    margin-bottom: 10px;
  }
`;

const ButtonHolder = styled.div`
  text-align: center;
  button {
    margin: 0 5px;
  }
`;

const withUsers = graphql(getPeople, {
  props: ({ data }) => {
    return data
      ? {
          userList: data.getPeople ? data.getPeople : [],
          loading: data.loading,
          refetchUserList: () => {
            return data.refetch();
          }
        }
      : {
          refetchUserList: () => {}
        };
  },
  options: () => {
    return {
      fetchPolicy: 'cache-and-network'
    };
  }
});

class HomePage extends React.Component {
  handleDeleteUser = (id) => {
    if (id) {
      this.props.client
        .mutate({
          mutation: deleteUser,
          variables: {
            id
          }
        })
        .then(({ data }) => {
          if (data.deleteUser && data.deleteUser.id) {
            this.props.refetchUserList();
          }
        });
    }
  };

  renderColumn = () => {
    return [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: '',
        key: 'action',
        render: (text, { id }) => {
          return (
            <ButtonHolder className="button-holder">
              <Button
                type="primary"
                shape="circle"
                onClick={() => this.props.history.push(`/user/edit/${id}`)}
                icon={<EditOutlined />}
              />
              <Button
                type="danger"
                shape="circle"
                onClick={() => this.handleDeleteUser(id)}
                icon={<DeleteOutlined />}
              />
            </ButtonHolder>
          );
        }
      }
    ];
  };

  render() {
    const { userList } = this.props;
    return (
      <Wrapper>
        <div className="add-user">
          <Button
            type="primary"
            onClick={() => this.props.history.push('/user/create')}
          >
            Add User
          </Button>
        </div>
        <Table
          dataSource={userList}
          columns={this.renderColumn()}
          rowKey="id"
        />
      </Wrapper>
    );
  }
}

export default withUsers(HomePage);

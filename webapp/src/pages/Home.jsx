import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getPeople } from '../gql/query';

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

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.data.getPeople ? props.data.getPeople : []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data.loading && data.getPeople && data.getPeople !== prevState.users) {
      return {
        users: data.getPeople
      };
    }
    return null;
  }

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
              <Button type="primary" shape="circle" icon={<EditOutlined />} />
              <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
            </ButtonHolder>
          );
        }
      }
    ];
  };

  render() {
    const { users } = this.state;
    return (
      <Wrapper>
        <div className="add-user">
          <Button type="primary">Add User</Button>
        </div>
        <Table dataSource={users} columns={this.renderColumn()} rowKey="id" />
      </Wrapper>
    );
  }
}

export default graphql(getPeople)(HomePage);

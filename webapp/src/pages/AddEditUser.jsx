import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import InputForm from '../components/Input';
import { addUser, updateUser } from '../gql/mutation';
import { getPerson } from '../gql/query';

const Wrapper = styled.div`
  .form-wrapper {
    margin: 0 100px;
  }

  .button-holder {
    margin-top: 10px;
    text-align: right;
    button {
      margin-left: 10px;
    }
  }
`;

class AddEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const {
      match: { params }
    } = this.props;
    if (params['id']) {
      this.props.client
        .query({
          query: getPerson,
          variables: {
            id: params['id']
          },
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => {
          const {
            getPerson: { firstName, lastName, email, phoneNumber }
          } = data;
          this.setState({
            firstName,
            lastName,
            email,
            phoneNumber
          });
        });
    }
  };

  handleOnChange = (e, keyName) => {
    const { value } = e.target;
    this.setState((prevState) => {
      return {
        ...prevState,
        [keyName]: value
      };
    });
  };

  handleSaveUser = () => {
    const {
      match: { params }
    } = this.props;
    const { firstName, lastName, email, phoneNumber } = this.state;
    const basicForm = {
      firstName,
      lastName,
      email,
      phoneNumber
    };
    const formData = params['id']
      ? {
          id: params['id'],
          input: basicForm
        }
      : basicForm;

    this.props.client
      .mutate({
        mutation: params['id'] ? updateUser : addUser,
        variables: formData
      })
      .then((res) => {
        const key = params['id'] ? 'updateUser' : 'addUser';
        if (res.data[key] && res.data[key].id) {
          this.props.history.push('/');
        }
      });
  };

  handleBack = () => {
    this.props.history.push('/');
  };

  render() {
    const { firstName, lastName, email, phoneNumber } = this.state;

    return (
      <Wrapper>
        <div className="form-wrapper">
          <Row gutter={24}>
            <Col span={6}>
              <InputForm
                label="First Name"
                value={firstName}
                keyName="firstName"
                onChange={this.handleOnChange}
              />
            </Col>
            <Col span={6}>
              <InputForm
                label="Last Name"
                value={lastName}
                keyName="lastName"
                onChange={this.handleOnChange}
              />
            </Col>
            <Col span={6}>
              <InputForm
                label="Email"
                value={email}
                keyName="email"
                onChange={this.handleOnChange}
              />
            </Col>
            <Col span={6}>
              <InputForm
                label="Phone"
                value={phoneNumber}
                keyName="phoneNumber"
                onChange={this.handleOnChange}
              />
            </Col>
          </Row>
          <div className="button-holder">
            <Button type="primary" onClick={this.handleSaveUser}>
              Save
            </Button>
            <Button type="default" onClick={this.handleBack}>
              Cancel
            </Button>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default AddEditUser;

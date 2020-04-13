import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import HomePage from './Home';
import AddEditUser from './AddEditUser';

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <h1>graphql demo</h1>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <HomePage {...props} {...this.props} />}
            />
            <Route
              exact
              path="/user/create"
              render={(props) => <AddEditUser {...props} {...this.props} />}
            />
            <Route
              exact
              path="/user/edit/:id"
              render={(props) => <AddEditUser {...props} {...this.props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default withApollo(Layout);

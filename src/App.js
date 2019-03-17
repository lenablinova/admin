import React, { Component } from 'react';
import './App.css';
import Auth from './components/auth';
import List from './components/list';
import {HashRouter, Route} from 'react-router-dom';
import Page from './components/page';


class App extends Component {
  state = {
    token:' '
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzgzNjE2M2MxYTE1YjUwMzQ4ZjM2ZGUiLCJpYXQiOjE1NTI2ODE4MDcsImV4cCI6MTU1NTI3MzgwN30.dE-U8tHuE1S33J9QSb7Je0yKCO9yeUkkYpelW8IiAxg'
  }
  setToken = (token) => {
    this.setState({
      token,
    })
  }


  render() {
    return (
      <div className="App">
      <HashRouter>
        <>
        <Route path = "/" exact render={(props) => <Auth {...props} setToken={this.setToken} token={this.state.token} />}/>
        <Route path = "/list" render={(props) => <List {...props} token={this.state.token} />} />
        <Route path = "/page" render={(props) => <Page {...props} token={this.state.token} />} />

        </>
      </HashRouter>
      </div>
    );
  }
}

export default App;

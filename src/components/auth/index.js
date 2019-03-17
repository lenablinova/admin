import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


class Auth extends Component {
  state={
    login: '',
    password: '',
    rememberMe: true,
  } 

  setLogin=(event)=>{
    this.setState({
      login: event.target.value
    })
  }

  setPass=(event)=>{
    this.setState({
      password: event.target.value
    })
  }


  

  getToken=(event)=>{
    event.preventDefault();

    const sendObj = {
      identifier: this.state.login,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    }

    axios.post('http://185.158.153.91:1322/auth/local', sendObj)
    .then(
      (response) => {
        const token = response.data.jwt
      this.props.setToken(token)
      
      }, 
      () => alert('Неправильные логин или пароль') 
      
      
      )
    console.log(sendObj)
  }

  
render() {
  if (this.props.token.length > 0) {
    return (
      <Redirect 
        to={{
          pathname: '/list'
        }}
        />
    )
  }
  return (
  <>
  <form onSubmit={this.getToken}>
    <input type='text' onChange={this.setLogin} value={this.state.login}></input>
    <input type='password' onChange={this.setPass} value={this.state.password}></input>
    <input type='submit' value='Войти'></input>
  </form>
  </>
  )
}

}

export default Auth;
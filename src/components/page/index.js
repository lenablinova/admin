import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";

class Page extends Component {

  constructor(props) {
    super(props);
    const id = props.location.state ? 
      props.location.state.pageInfo
      : '';

      this.state = {
        id,
        name: '',
        description: '',
        slug: '',
        redirect: false,
        message: ''
      }
  }

  componentDidMount() {
    if (this.state.id)
      return (
        axios.get(
          `http://185.158.153.91:1322/pages/${this.state.id}`, 
          { headers: { Authorization: `Bearer ${this.props.token}`}}
        )
        .then((response) => {
          const {name, description, slug} = response.data;

          this.setState({
            name, 
            description, 
            slug})
          })
      )
  }

  changeName = (event) => {
    this.setState ({
      name: event.target.value
    })
  }

  changeSlug = (event) => {
    this.setState ({
      slug: event.target.value
    })
  }

  changeDescription = (event) => {
    this.setState ({
      description: event.target.value
    })
  }

  changePage=() => {
    const {name, description, slug, id} = this.state;
    axios.put(
      `http://185.158.153.91:1322/pages/${id}`, 
      {name, description, slug}, 
      { headers: { Authorization: `Bearer ${this.props.token}`}}
    )
    .then (() => this.setState({message: 'Страница успешно обновлена'}))
  }

  deletePage = () => {
    axios.delete(
      `http://185.158.153.91:1322/pages/${this.state.id}`, 
      { headers: { Authorization: `Bearer ${this.props.token}`}}
    )
    .then (() => this.setState({redirect: true}))
  }

  addPage=() => {
    const {name, description, slug} = this.state;

    axios.post(
      'http://185.158.153.91:1322/pages', 
      {name, slug, description}, 
      { headers: { Authorization: `Bearer ${this.props.token}`}}
    )
    .then (() => this.setState({message: 'Страница успешно добавлена'}))

  }

  
  render() {
    const {name, description, slug, id} = this.state;
    if (this.state.redirect === true) {
      return (
        <Redirect to={{
          pathname: '/list'
        }} />
      )
    }
    
    return (
      <>
        <button>
          <Link to={{
            pathname: '/'
          }}>Back
          </Link>
        </button>
        <button onClick={this.deletePage}>Delete</button>
        <h1>{id}</h1>
        <label>Name
        <input type='text' value={name} onChange={this.changeName}></input>
        </label>
        <label>Slug
        <input type='text' value={slug} onChange={this.changeSlug}></input>        
        </label>
        <label>Description
        <input type='text' value={description} onChange={this.changeDescription}></input>       
        </label>
        { !id ?
            <>
              <button onClick={this.addPage}>Добавить
              </button>
            </>
          : 
            <>
              <button onClick={this.changePage}>Изменить
              </button>
            </>
        }
        { this.state.message ?
            <div>
              {this.state.message}
            </div>
          : null
        }
        </>
    )
  }

}

export default Page;
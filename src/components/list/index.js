import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";
import './index.css';

class List extends Component {
  state = {
    list: []
  }

  componentDidMount() {
    this.getPages()
  }

  getPages = () => {
    axios.get('http://185.158.153.91:1322/pages', { headers: { Authorization: `Bearer ${this.props.token}`}})
    .then((response) => {
      this.setState({list: response.data})
    })
  }

  deletePage = (id) => {
    axios.delete(`http://185.158.153.91:1322/pages/${id}`, { headers: { Authorization: `Bearer ${this.props.token}`}})
    .then (() => this.getPages())
  }


  render() {
    if (this.props.token.length === 0) {
      return (
        <Redirect 
          to={{
            pathname: '/'
          }}
          />
      )
    }
    if (this.state.list.length === 0) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      )}
    
      return (
        <>
          <h1>Список статей</h1>
          <div className='row'><button>
            <Link to={{
              pathname: '/page',
              state: this.state.id
            }}>Добавить</Link>
          </button></div>
          
          <table className='list'>
            
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Description</td>
                <td/>
                
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((el, i) => {
                return (
                  <tr key={i}>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.slug}</td>
                    <td>{el.description}</td>
                    <td className='cell'>
                      <button onClick={() => this.deletePage(el.id)}>Delete</button>
                      <button>
                      <Link to={{
                        pathname: '/page',
                        state: {
                          pageInfo: el.id
                        }
                      }}>Edit</Link>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
        </>
      )
    
  }
}

export default List;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import { addTodo } from '../actions'


class AddTodo extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      data: []
    }
    this.handleTodo = this.handleTodo.bind(this);
    // this.listTodo = this.listTodo.bind(this);
    // this.removeTodo = this.removeTodo.bind(this);
  }
  

  componentDidMount() {
    var  _that = this
    axios.get('http://localhost:3001/todos.json', {
      })
      .then(function (response) {
         _that.setState({data: response.data})
        
        // _that.listTodo()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
  handleTodo(e){
   var  _that = this;
    e.preventDefault()
    var value = this.refs.name.value
      axios.post('http://localhost:3001/todos.json', {
        name: value
      })
      .then(function (response) {
        // _that.setState({data: response.data})
        _that.state.data.push(response.data);
        
        _that.setState(_that.state.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeTodo(e){
    e.preventDefault()
    
    var updateState = [];
   var id = e.target.id;
   var _that = this;
    axios.get('http://localhost:3001/todos/'+id+'/destroy_todo.json', {})
      .then(function (response) {

       updateState = _that.state.data.filter(function(item) { 
         
          return item.id != response.data.id
       })
       _that.state.data = updateState;
      _that.setState(_that.state.data);
      })
      .catch(function (error) {
          
      });
  }
  



  render() {
    // var _this = this;
    return (

      <div className="App col-md-6">
        <div className="todolist not-done">
        <h1>Todos</h1>
        <form method='post' onSubmit={this.handleTodo}>
          <input name="name" ref='name' className="form-control add-todo" />
          <button type="submit" className="btn btn-success">Add Todo</button>
        </form>
            <ul style={{'listStyle':'none'}}>{  
            this.state.data.map((x, i) =>
              <li className="ui-state-default" key={i}>
              <div className="checkbox">
              {x.name} <span className="pull-right" id={x.id} onClick={this.removeTodo.bind(this)}><i id={x.id} className="fa fa-times" aria-hidden="true"></i></span>
              </div>
              </li>
            )}
          </ul>
        </div>
        </div>










    );
  }
}

export default AddTodo;

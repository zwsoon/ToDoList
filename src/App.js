import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import uuid from 'uuid' - used to create random IDs
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    todos: [

    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }

  //toggle Complete
  markComplete=(id)=>{
    this.setState({ todos: this.state.todos.map(todo =>{
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }
  // Delete todo
  delTodo = (id) =>{
    //implementing axios to delete to a 'virtual db'
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ 
      todos: [...this.state.todos.filter(todo => todo.id!==id)]
    }));
  }

  //Add Todo
  addTodo = (title) => {
    //original code
    /*const newTodo={
      id: uuid.v4(),
      title,
      completed: false
    }*/

    //implemnating axios to add to a 'virtual db'
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    })
    .then(res => this.setState({todos: [...this.state.todos,res.data]}));
    
  }

  render() {
    return(
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={proper=>(
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos 
                  todos={this.state.todos} 
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )}/>
            <Route path="/about" component={About}/>
            
          </div>
        </div>
      </Router>
    );
  }
}


export default App;

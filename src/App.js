import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Landing from './landing';
import Product from './product';
import Login from './login';
import Signup from './signup';
import EditAccount from './editAccount';
import Cart from './cart';
import Orders from './orders';



class App extends Component {
  constructor(props) {
    super(props);

    this.changeKey = this.changeKey.bind(this);

    this.state = {
      key: ''
    };
  }

  changeKey = (value) => {
    this.setState({
      key: value
    });
  }

  isValid = () => {
    fetch(`http://localhost:3001/validateKey?key=${this.state.key}`)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        return data;
    });
  }

  render() {
    if(this.isValid()) {
      return (
        <Router>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sgfdg</Link>
            <Link to="/cart">Cart</Link>
          </nav>

          <Route exact path="/" render={props => 
            (<Landing/>)}/>
          <Route exact path="/product" render={props => 
            (<Product/>)}/>
          <Route exact path="/login" render={props => 
            (<Login/>)}/>
          <Route exact path="/signup" render={props => 
            (<Signup/>)}/>
          <Route exact path="/account/edit" render={props => 
            (<EditAccount/>)}/>
          <Route exact path="/cart" render={props => 
            (<Cart />)}/>
          <Route exact path="/orders" render={props => 
            (<Orders/>)}/>
        </Router>
      );
    }
    else {
      return (
        <Router>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </nav>

          <Route exact path="/" render={props => 
            (<Landing/>)}/>
          <Route exact path="/product" render={props => 
            (<Product/>)}/>
          <Route exact path="/login" render={props => 
            (<Login/>)}/>
          <Route exact path="/signup" render={props => 
            (<Signup/>)}/>
          <Route exact path="/account/edit" render={props => 
            (<EditAccount/>)}/>
          <Route exact path="/cart" render={props => 
            (<Cart />)}/>
          <Route exact path="/orders" render={props => 
            (<Orders/>)}/>
        </Router>
      );
    }
  }
}

export default App;

import React, {Component, isValidElement} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import e from 'express';



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
  isValid = key => {
    getData = () => {
      fetch(`http://localhost:3001/validateKey?key=${this.state.key}`)
      .then(response => {
          return response.json();
      }).then(data => {
          console.log(data);
          return data;
      });
  }
  }
  render() {
    if(isValid(this.state.key)) {
      return (
        <Router>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sgfdg</Link>
            <Link to="/cart">Cart</Link>
          </nav>
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
        </Router>
      );
    }
  }
}

export default App;

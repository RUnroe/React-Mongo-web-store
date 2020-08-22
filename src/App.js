import React, {Component, isValidElement} from 'react';
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

    //this.changeKey = this.changeKey.bind(this);

    this.state = {
      key: '',
      name: '',
      loggedIn: false
    };
  }

  changeKey = (key, name) => {
    this.setState({
      key: key,
      name: name
    });
    this.isValid();
  }

  isValid = () => {
    fetch(`http://localhost:3001/validateKey?key=${this.state.key}`)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        this.setState({
          loggedIn: data
        });
    });
  }



  render() {
    console.log("Logged in: ", this.state.loggedIn);
    let routes = <> <Route exact path="/" render={props => 
                  (<Landing/>)}/>
                <Route exact path="/product" render={props => 
                  (<Product/>)}/>
                <Route exact path="/login" render={props => 
                  (<Login action={this.changeKey}/>)}/>
                <Route exact path="/signup" render={props => 
                  (<Signup/>)}/>
                <Route exact path="/account/edit" render={props => 
                  (<EditAccount/>)}/>
                <Route exact path="/cart" render={props => 
                  (<Cart />)}/>
                <Route exact path="/orders" render={props => 
                  (<Orders/>)}/> </>;

    return (
      <Router>
        <nav>
          {this.state.loggedIn && <>
            <Link to="/">Home</Link>
            <Link to="/signup">Sgfdg</Link>
            <Link to="/cart">Cart</Link> </>
          }
          {!this.state.loggedIn && <>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link> </>
          }
        </nav>
        {routes}
        
      </Router>
    );
  }
  
}

export default App;

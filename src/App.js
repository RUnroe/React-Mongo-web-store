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

    this.state = {
      key: "",
      name: "",
      email: "",
      loggedIn: false
    };
  }

  changeKey = (key, name, email) => {
    this.setState({
      key: key,
      name: name,
      email: email
    });
    this.isValid();
  }

  updateUser = (name, email) => {
    this.setState({
      name: name,
      email: email
    });
  }

  isValid = () => {
    fetch(`http://localhost:3001/validateKey?key=${this.state.key}`)
    .then(response => {
        return response.json();
    }).then(data => {
        this.setState({
          loggedIn: data
        });
    });
  }


  signout = () => {
    console.log("Signed out");
    this.setState({
      name: "",
      email: "",
      key: "",
      loggedIn: false
    });
  }


  render() {
    console.log("Logged in: ", this.state.loggedIn);
    let routes = <> <Route exact path="/" render={props => 
                  (<Landing/>)}/>
                <Route path="/product/:id" render={props => 
                  (<Product itemID={props.match.params.id} loggedIn={this.state.loggedIn} userKey={this.state.key}/>)}/>
                <Route exact path="/login" render={props => 
                  (<Login action={this.changeKey}/>)}/>
                <Route exact path="/signup" render={props => 
                  (<Signup/>)}/>
                <Route exact path="/account/edit" render={props => 
                  (<EditAccount name={this.state.name} email={this.state.email} loggedIn={this.state.loggedIn} userKey={this.state.key} updateUser={this.updateUser}/>)}/>
                <Route exact path="/cart" render={props => 
                  (<Cart userKey={this.state.key} loggedIn={this.state.loggedIn}/>)}/>
                <Route exact path="/orders" render={props => 
                  (<Orders userKey={this.state.key} loggedIn={this.state.loggedIn}/>)}/> </>;

    return (
      <Router>
        <nav>
          {this.state.loggedIn && <>
            <div><Link to="/">Home</Link></div>
            <section><div><Link to="/account/edit">{this.state.name}</Link></div>
            <div><Link to="/orders">Your Orders</Link></div>
            <div><Link to="/cart">Cart</Link></div>
            <div onClick={() => this.signout()} className="signoutText">Sign Out</div></section></>
          }
          {!this.state.loggedIn && <>
            <div><Link to="/">Home</Link></div>
            <section><div><Link to="/signup">Sign Up</Link></div>
            <div><Link to="/login">Log In</Link></div></section></>
          }
        </nav>
        {routes}
        
      </Router>
    );
  }
  
}

export default App;

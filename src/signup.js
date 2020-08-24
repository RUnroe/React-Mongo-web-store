import React, { Component} from 'react';
import { Redirect } from 'react-router';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPass: "",
            displayError: false
        };
    }

    
    sumbitData = () => {
        if(this.state.password === this.state.confirmPass) {
            fetch("http://localhost:3001/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password})
            }).then(response => {
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    confirmPass: "",
                    redirect: "/login"
                })
            });
        }
        else{
            this.setState({
                displayError: true
            });
        }
    }


    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <section className="mainSection">
                <section className="formSection">
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" value={this.state.name} onChange={event => this.setState({name: event.target.value})}/>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" value={this.state.email} onChange={event => this.setState({email: event.target.value})}/>
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
                    <label htmlFor="confirmPass">Confirm Password: </label>
                    <input id="confirmPass" type="password" value={this.state.confirmPass} onChange={event => this.setState({confirmPass: event.target.value})}/>
                    <p className={this.state.displayError ? "errMsg" : "errMsg hidden"}>Passwords do not match</p>
                    <button onClick={this.sumbitData}>Sign up</button>
                </section>
            </section>
        );
    }
}

export default Signup;
import React, { Component} from 'react';
import { Redirect } from 'react-router';
import CartItem from './cartItemComponent'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            redirect: null
        };
    }

    componentDidMount() {
        if(!this.props.loggedIn){
            this.setState({
                redirect: "/login"
            });
        }
        else{
            fetch(`http://localhost:3001/cart?key=${this.props.userKey}`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState({
                    cartList: response
                });
                console.log(response);
            });
        }
    }

    totalPrice = () => {
        let total = 0;
        this.state.cartList.forEach(item => {
            total += item.quantity * item.price;
        });
        return (Math.floor(total*100))/100;
    }

    checkout = () => {
        fetch(`http://localhost:3001/checkout?key=${this.props.userKey}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        });
    }

    changeItemQuantity = (itemID, newQuantity) => {
        this.setState(state => {
            const cartList = state.cartList.map(item => {
                if(item.itemID == itemID) {
                    item.quantity = newQuantity;
                    console.log(item);
                }
                return item;
            });
            return {
                cartList,
                redirect: null
            }
        });
        
    }

    componentWillUnmount() {
        
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <section>
                <section>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cartList.map(cartItem => (<CartItem cartItem={cartItem} key={cartItem.itemID} action={this.changeItemQuantity} />))}
                        </tbody>
                    </table>
                    <p>${this.totalPrice()}</p>
                    <button onClick={() => this.checkout()}>Check Out</button>
                </section>
            </section>
        );
    }
}

export default Cart;
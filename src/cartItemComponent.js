import React, { Component} from 'react';


class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.cartItem.quantity
        };
    }

   
    render() {
        return(
            <tr>
                <td>{this.props.cartItem.name}</td>
                <td>{this.props.cartItem.price}</td>
                <td>{this.state.quantity}</td>
                <td><div>
                    <button>^</button>
                    <button>v</button>
                </div></td>
                <td><button>X</button></td>
            </tr>
        );
    }
}

export default CartItem;
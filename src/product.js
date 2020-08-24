import React, { Component} from 'react';
import { Redirect } from 'react-router';


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: this.props.itemID,
            name: "",
            price: 0,
            protection: 0,
            rating: 0,
            weight: 0,
            imgSrc: "",
            redirect: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3001/item/${this.state.itemID}`)
        .then(response => {
            return response.json();
        }).then(data => {
            this.setState({
            name: data.name,
            price: data.price,
            protection: data.protection,
            rating: data.rating,
            weight: data.weight,
            imgSrc: data.imgSrc
            });
            console.log(data);
        });
    }

    backToHome = () => {
        this.setState({
            redirect: "/"
        });
    }

    addToCart = () => {
        if(!this.props.loggedIn) {
            this.setState({
                redirect: "/login"
            });
        }
        else{
            fetch(`http://localhost:3001/cart?key=${this.props.userKey}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({itemID: this.state.itemID})
            });
        }
    }


    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <section className="mainSection">
                <h1 className="pageTitle">{this.state.name}</h1>
                <section className="product">
                    <div className="tableContainer">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Weight</td>
                                    <td>{this.state.weight} oz</td>
                                </tr>
                                <tr>
                                    <td>Protection</td>
                                    <td>{this.state.protection}%</td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>{this.state.rating}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>${this.state.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <img src={"/" + this.state.imgSrc}/>
                    <div className="returnBtnDiv"><button onClick={this.backToHome}>Go Back</button></div>
                    <div className="addToCartDiv">
                        <button onClick={this.addToCart}>Add to Cart</button>
                        <a href={this.props.loggedIn ? "/cart" : "/login"}>Go to Cart</a>
                    </div>
                </section>
            </section>
        );
    }
}

export default Product;
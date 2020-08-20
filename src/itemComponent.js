import React, { Component} from 'react';


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return(
            <a href={"/product/" + this.props.entry.itemID}>
                <div className="itemDiv">
                    <img src={this.props.entry.imgSrc}/>
                    <p className="nameTag">{this.props.entry.name}</p>
                    <p className="priceTag">{this.props.entry.price}</p>
                </div>
            </a>
        );
    }
}

export default Item;
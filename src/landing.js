import React, { Component} from 'react';
import Item from './itemComponent';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3001/items`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            this.setState({
                itemList: response
            });
        });
    }

    render() {
        if(!this.state.itemList) {
            return( 
                <section className="mainSection"><div id="itemContainer"></div> </section>
            )
        }
        return(
            <section className="mainSection">
                <div id="itemContainer">
                    {this.state.itemList.map(entry => (<Item entry={entry} key={entry.itemID} />))}
                </div>
            </section>
        );
    }
}

export default Landing;
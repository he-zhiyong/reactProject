import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            name : "test"
        };
    }
    getName(){
        fetch('/name')
            .then(res=>res.json())
            .then(result =>{
                if(result.success){
                    this.setState({
                        name:result.data.name
                    })
                }
            })
    }
    render() {
        return (
            <div>
                <label>name:</label>
                <label>{this.state.name}</label>
                <div>
                    <button onClick={this.getName.bind(this)}>getName</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Test/>, document.getElementById('root'))


import React from "react";
import {Link} from 'react-router';
import {Button} from 'antd';

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <Button>
                    <Link to="/">Home</Link>
                </Button>
                <Button>
                    <Link to="/login">Login</Link>
                </Button>
                <Button>
                    <Link to="/register">Register</Link>
                </Button>
            </div>
        )
    }
}
import React from "react";
import './content-main.less';
import {Layout} from 'antd';
const {Content } = Layout;

export default class ContentMain extends React.Component {
    render() { 
        return (
            <Content>
                <div>
                <a onClick={this.props.addApiHistoryData}>Add</a>
                </div>
            </Content>
        )
    }
}
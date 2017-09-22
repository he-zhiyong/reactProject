import React from "react";
import './content-main.less';
import {Layout} from 'antd';
const {Content } = Layout;

export default class ContentMain extends React.Component {
    render() { 
        return (
            <Content>
                <div>
                    content
                </div>
            </Content>
        )
    }
}
import React from 'react';
import './url.less';
import { Dropdown, Input ,Select, Menu } from 'antd';
const Option = Select.Option;

export default class ContentMain extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }
    render() {
        const selectBefore = (
            <Select defaultValue="POST" style={{ width: 80 }}>
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
            </Select>
        );
        const menu = (
            <Menu onClick={() => alert(1)}>
                <Menu.Item key="1">1st menu item</Menu.Item>
                <Menu.Item key="2">2nd menu item</Menu.Item>
                <Menu.Item key="3">3d menu item</Menu.Item>
            </Menu>
        );
        return (
            <div className="url">
                <Input addonBefore={selectBefore} addonAfter={<span className="addParams" onClick={() => alert(1)}>Params</span>} size="large" placeholder="Enter request URL" />
                <div className="buttons">
                    <Dropdown.Button type="primary" size="large" onClick={() => alert(1)} overlay={menu} loading >Send</Dropdown.Button>
                    <Dropdown.Button size="large" onClick={() => alert(1)} overlay={menu} loading>Save</Dropdown.Button>
                </div>
            </div>
        )
    }
}
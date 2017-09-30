import React from "react";
import './content-main.less';
import { Layout, Button, Tabs , Dropdown,Input, Select,Menu} from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
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
            <Menu onClick={()=>alert(1)}>
              <Menu.Item key="1">1st menu item</Menu.Item>
              <Menu.Item key="2">2nd menu item</Menu.Item>
              <Menu.Item key="3">3d menu item</Menu.Item>
            </Menu>
        );
          
        return (
            <Content>
                <Tabs
                    onChange={this.onChange.bind(this)}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit.bind(this)}
                >
                    {this.state.panes.map(pane => 
                        <TabPane tab={pane.title} key={pane.key}>
                            <div className="header">
                                <Input addonBefore={selectBefore} addonAfter={<span className="addParams" onClick={()=>alert(1)}>Params</span>} size="large" placeholder="Enter request URL"/>
                                <div className="buttons">
                                    <Dropdown.Button type="primary" size="large" onClick={()=>alert(1)} overlay={menu} loading >Send</Dropdown.Button>
                                    <Dropdown.Button size="large" onClick={()=>alert(1)} overlay={menu} loading>Save</Dropdown.Button>
                                </div>
                            </div>
                        </TabPane>)}
                </Tabs>
            </Content>
        )
    }
    onChange(activeKey){
        this.setState({ activeKey });
    }
    onEdit(targetKey, action){
        this[action](targetKey);
    }
    add(){
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove(targetKey){
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
}
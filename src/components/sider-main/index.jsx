import React from "react";
import './sider-main.less';
import { Layout, Input, Tabs, Collapse, Card} from 'antd';
const {Sider } = Layout;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;


export default class SiderLeft extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            collapsed: false,
        };
    }
    render() { 
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                width="280"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
                <div className="filter">
                    <Search
                        placeholder="Filter"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="History" key="1">
                        <div className="tbar">
                            <span onClick={() => alert(1)}>Clear all</span>
                        </div>
                        <Collapse bordered={false} defaultActiveKey={['1']} >
                            <Panel header="2017-09-20" key="1">
                                <Card title="Card title" extra={<a href="#">More</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title" extra={<a href="#">More</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title" extra={<a href="#">More</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title" extra={<a href="#">More</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Panel>
                            <Panel header="2017-09-19" key="2">
                                <Card title="Card title" extra={<a href="#">More</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card title="Card title" extra={<a href="#">More</a>}>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Panel>
                            <Panel header="2017-09-18" key="3">
                                <p>dasdsadfdsf</p>
                            </Panel>
                            <Panel header="2017-09-17" key="4">
                                <p>dasdsadfdsf</p>
                            </Panel>
                            <Panel header="2017-09-16" key="5">
                                <p>dasdsadfdsf</p>
                            </Panel>
                            <Panel header="2017-09-15" key="6">
                                <p>dasdsadfdsf</p>
                            </Panel>
                            <Panel header="2017-09-14" key="7">
                                <p>dasdsadfdsf</p>
                            </Panel>
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Collections" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            </Sider>
        )
    }
}
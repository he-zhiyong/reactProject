import React from 'react';
import './content-main.less';
import Url from './url/index.jsx';
import Request from './request/index.jsx';
import Response from './response/index.jsx';
import { Layout, Tabs} from 'antd';
const Content = Layout.Content;
const TabPane = Tabs.TabPane;

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
                                <Url/>
                            </div>
                            <div className="body">
                                <Request/>
                                <Response/>
                            </div>
                        </TabPane>)}
                </Tabs>
            </Content>
        )
    }
    onChange(activeKey) {
        this.setState({ activeKey });
    }
    onEdit(targetKey, action) {
        this[action](targetKey);
    }
    add() {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove(targetKey) {
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
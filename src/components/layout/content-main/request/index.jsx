import React from 'react';
import './request.less';
import EditableTable from '../../../editableTable/index.jsx'
import { Tabs,Radio} from 'antd';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

export default class Request extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        this.state = {
            activeKey: panes[0].key,
            radioValue:1,
            panes,
        };
    }
    render() {
        return (
            <div className="request">
                <h3 className="title">Request</h3>
                <Tabs className="content" defaultActiveKey="3">
                    <TabPane tab="Authorization" disabled key="1">     
                    </TabPane>
                    <TabPane tab="Headers" key="2">
                        <EditableTable/>
                    </TabPane>
                    <TabPane tab="Body" key="3">
                        <RadioGroup onChange={this.radioOnChange.bind(this)} value={this.state.radioValue}>
                            <Radio value={1}>form-data</Radio>
                            <Radio value={2}>x-www-form-urlencoded</Radio>
                            <Radio value={3}>raw</Radio>
                            <Radio value={4}>binary</Radio>
                        </RadioGroup>
                        <EditableTable/>
                    </TabPane>
                    <TabPane tab="Pre-request Script" disabled key="4">
                    </TabPane>
                    <TabPane tab="Tests" disabled key="5">
                        <EditableTable/>
                    </TabPane>
                </Tabs>
            </div>
           
        )
    }
    radioOnChange(e){
        this.setState({
            radioValue: e.target.value,
        });
    }
}
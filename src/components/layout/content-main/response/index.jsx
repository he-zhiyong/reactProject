import React from 'react';
import './response.less';
import Editor from '../../../editor/index.jsx';
import { Button, Tabs, Select} from 'antd';
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Response extends React.Component {
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
            <div className="response">
                <h3 className="title">Response</h3>
                <Tabs className="content" defaultActiveKey="1" tabBarExtraContent={
                    <div className="info">
                        <label>Status: <span>200 OK</span></label>
                        <label>Time: <span>34ms</span></label>
                        <label>Size: <span>109.88kb</span></label>
                    </div>
                }>
                    <TabPane tab="Body" key="1">
                        <div className="buttons">
                            <ButtonGroup>
                                <Button>Pretty</Button>
                                <Button>Raw</Button>
                                <Button>Preview</Button>
                            </ButtonGroup>
                            <Select className="selectLanguage" defaultValue="HTML">
                                <Option value="HTML">HTML</Option>
                                <Option value="JavaScript">JavaScript</Option>
                                <Option value="CSS">CSS</Option>
                                <Option value="JSON">JSON</Option>
                                <Option value="XML">XML</Option>
                                <Option value="Text">Text</Option>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <Editor/>
                    </TabPane>
                    <TabPane tab="Cookies" key="2">

                    </TabPane>
                    <TabPane tab="Headers" key="3">
                        
                    </TabPane>
                    <TabPane tab="Tests Results" disabled key="4">
                    
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
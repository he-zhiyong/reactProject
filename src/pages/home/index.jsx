import React from 'react';
import './home.less';
import moment from 'moment';
import SiderMain from '../../components/sider-main/index.jsx';
import HeaderMain from '../../components/header-main/index.jsx';
import ContentMain from '../../components/content-main/index.jsx';
import FooterMain from '../../components/footer-main/index.jsx';
import { Layout } from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siderCollapsed: false,
            apiHistoryData: JSON.parse(localStorage.getItem("apiHistoryData")) || [],
            apiData:JSON.parse(localStorage.getItem("apiData")) || []
        };
    }
    render() {
        const sider = {
            siderCollapsed: this.state.siderCollapsed,
            apiHistoryGroupData: this.apiDataHandle.call(this, this.state.apiHistoryData),
            deleteApiHistoryData: this.deleteApiHistoryData.bind(this),
            deleteApiHistoryGroupData: this.deleteApiHistoryGroupData.bind(this),
            clearApiHistoryData: this.clearApiHistoryData.bind(this),
            apiGroupData: this.apiDataHandle.call(this, this.state.apiData),
            addApiData: this.addApiData.bind(this),            
            deleteApiData: this.deleteApiData.bind(this),
            deleteApiGroupData: this.deleteApiGroupData.bind(this),
            clearApiData: this.clearApiData.bind(this),
        }
        const header = {
            siderCollapsed: this.state.siderCollapsed,
            toggleSider: this.toggleSider.bind(this),
            addApiHistoryData: this.addApiHistoryData.bind(this)
        }
        const content = {
            addApiHistoryData: this.addApiHistoryData.bind(this)
        }
        return (
            <Layout className="home-layout">
                <SiderMain {...sider} />
                <Layout>
                    <HeaderMain {...header} />
                    <ContentMain {...content}/>
                    <FooterMain />
                </Layout>
            </Layout>
        )
    }
    toggleSider() {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        });
    }
    apiDataHandle(data) {
        let apiData = data
        let apiGroupData = []
        const hasTestDate = (apiData, groupId) => {
            var hasGroupId = false;
            apiData.forEach((api, index) => {
                if (api.groupId === groupId) {
                    hasGroupId = index;
                }
            });
            return hasGroupId;
        }
        if (apiData.length) {
            apiData = this.sortData(apiData, 'testDate')
            apiData.forEach((api, index) => {
                let i = hasTestDate(apiGroupData, api.groupId)
                if (i === false) {
                    apiGroupData.push({
                        testDate: api.testDate,
                        groupId:api.groupId,
                        groupName:"分组"+i,
                        apiData: [api]
                    });
                } else {
                    apiGroupData[i].apiData.push(api)
                }
            });
        }
        return apiGroupData
    }
    sortData(data, key) {
        function by(key) {
            return function (o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[key];
                    b = p[key];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return a > b ? -1 : 1;
                    }
                    return typeof a > typeof b ? -1 : 1;
                }
            }
        }
        return data.sort(by(key));
    }
    updateApiData(apiData){
        this.setState({ apiData })
        localStorage.setItem("apiData", JSON.stringify(apiData))
    }
    addApiData() {
        let num = this.state.apiData.length+1
        let newApiData = {
            testDate: moment().format('YYYY-MM-DD'),
            title: "测试" + num,
            id: num,
            groupId:moment().format('YYYY-MM-DD'),
        }
        let apiData = this.state.apiData
        apiData.push(newApiData)
        this.updateApiData.call(this,apiData)
    }
    deleteApiData(id) {
        let apiData = this.state.apiData
        apiData.forEach((item,index,apiData)=>{
            if(item.id === id){
                apiData.splice(index,1)
            }
        })
        this.updateApiData.call(this,apiData)
    }
    deleteApiGroupData(groupId){
        let apiData = this.state.apiData
        apiData = apiData.filter((item,index,apiData)=>{
            return item.groupId !== groupId
        })
        this.updateApiData.call(this,apiData)
    }
    clearApiData() {
        this.updateApiData.call(this,[])
    }
    updateApiHistoryData(apiHistoryData){
        this.setState({ apiHistoryData })
        localStorage.setItem("apiHistoryData", JSON.stringify(apiHistoryData))
    }
    addApiHistoryData() {
        let num = this.state.apiHistoryData.length+1
        let newApiData = {
            testDate: moment().format('YYYY-MM-DD'),
            title: "测试" + num,
            id: num,
            groupId:moment().format('YYYY-MM-DD'),
        }
        let apiHistoryData = this.state.apiHistoryData
        apiHistoryData.push(newApiData)
        this.updateApiHistoryData.call(this,apiHistoryData)
    }
    deleteApiHistoryData(id) {
        let apiHistoryData = this.state.apiHistoryData
        apiHistoryData.forEach((item,index,apiHistoryData)=>{
            if(item.id === id){
                apiHistoryData.splice(index,1)
            }
        })
        this.updateApiHistoryData.call(this,apiHistoryData)
    }
    deleteApiHistoryGroupData(groupId){
        let apiHistoryData = this.state.apiHistoryData
        apiHistoryData = apiHistoryData.filter((item,index,apiHistoryData)=>{
            return item.groupId !== groupId
        })
        this.updateApiHistoryData.call(this,apiHistoryData)
    }
    clearApiHistoryData() {
        this.updateApiHistoryData.call(this,[])
    }
    
}
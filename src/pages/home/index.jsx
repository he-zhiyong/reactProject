import React from 'react';
//import {connect} from 'react-redux';
import './home.less';
import moment from 'moment';
import SiderMain from '../../components/sider-main/index.jsx';
import HeaderMain from '../../components/header-main/index.jsx';
import ContentMain from '../../components/content-main/index.jsx';
import FooterMain from '../../components/footer-main/index.jsx';
import { Layout} from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            siderCollapsed: false,
            apiData:JSON.parse(localStorage.getItem("apiData"))||[]
        };
    }
    toggle() {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        });
    }
    addApiData(){
        var apiData = JSON.parse(localStorage.getItem("apiData"));
        var newApiData =  {
            testDate:moment().subtract(Math.random*10, 'days').format('YYYY-MM-DD'),
            title:"测试0221"
        }
        apiData.push(newApiData);
        localStorage.setItem("apiData",JSON.stringify(apiData));
    }
    render() {
        const sider = {
            siderCollapsed:this.state.siderCollapsed,
            addApiData:this.addApiData,
            apiData:this.state.apiData
        }
        const header = {
            toggle:this.toggle,
            siderCollapsed:this.state.siderCollapsed,
        }   
        return (
            <Layout className="home-layout">
                <SiderMain {...sider}/>
                <Layout>
                    <HeaderMain {...header}/>
                    <ContentMain/>
                    <FooterMain/>
                </Layout>
            </Layout>
        )
    }
}
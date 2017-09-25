import React from 'react';
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
        this.updateApiData = this.updateApiData.bind(this);
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
    updateApiData(apiData){
        this.setState({
            apiData
        })
        localStorage.setItem("apiData",JSON.stringify(apiData))
        console.log(this.state.apiData)
    }
    render() {
        const sider = {
            siderCollapsed:this.state.siderCollapsed,
            apiData:this.state.apiData,
            updateApiData:this.updateApiData
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
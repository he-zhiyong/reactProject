import React from 'react';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router'
import { Link } from 'react-router';
import '../styles/login.less';
import { Form, message, Icon, Input, Button, Checkbox } from 'antd';
import Sha1 from 'sha1';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	constructor() {
		super(...arguments);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				var url = '/api/login';
				var user = {
					userName: values.userName,
					password: Sha1(values.password)
				}
				var options = {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(user)
				}
				fetch(url, options)
					.then((res) => {
						if(res.status>=200 && res.status<300){
							user.token = res.headers.get('Authorization')
							localStorage.setItem('user',JSON.stringify(user))
							return res.json()
						}
					})
					.then(result => {
						if (result.success) {
							message.success(result.message);
							appHistory.push('/')
						} else {
							message.error(result.message);
						}
					})
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-wrap">
				<div className="login-logo">
					<h1 className="login-title">Login Demo</h1>
				</div>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
							)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
							)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>Remember me</Checkbox>
							)}
						<a className="login-form-forgot" href="">Forgot password</a>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Login
              			</Button>
						Or <Link to="/register">register now!</Link>
					</FormItem>
				</Form>
			</div>

		);
	}
}

const Login = Form.create()(NormalLoginForm);

export default Login;
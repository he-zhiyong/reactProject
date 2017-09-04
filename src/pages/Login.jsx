import React from 'react';
import {Link} from 'react-router';
import '../styles/login.less';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		/* fetch('/name')
			.then(res => res.json())
			.then(result => {
				if (result.success) {
					alert(result.data.name)
				}
			})  */
		fetch('/api/random')
			.then(res => res.json())
			.then(result => {
				alert(result)
			})
		/* this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', values);
		  }
		}); */

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
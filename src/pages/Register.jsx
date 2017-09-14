import React from 'react';
import { createHashHistory } from 'history'
import { useRouterHistory } from 'react-router'
import '../styles/register.less';
import { Link } from 'react-router';
import { Form, message, Input, Checkbox, Button } from 'antd';
import Sha1 from 'sha1';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
	constructor() {
		super(...arguments);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
		this.checkPassword = this.checkPassword.bind(this);
		this.checkConfirm = this.checkConfirm.bind(this);
		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
		}
	};
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let agreement = values.agreement;
				let password = values.password;
				let confirm = values.confirm;
				if (agreement && password === confirm) {
					var url = '/api/register';
					var options = {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							userName: values.userName,
							password: Sha1(values.password)
						})
					}
					fetch(url, options)
						.then(res => res.json())
						.then(result => {
							if (result.success) {
								message.success(result.message);
								appHistory.push('/login')
							} else {
								message.error(result.message);
							}
						})
				}
			}
		});
	}
	handleConfirmBlur(e) {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}
	checkPassword(rule, value, callback) {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}
	checkConfirm(rule, value, callback) {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 18 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 8,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};
		return (
			<div className="register-wrap">
				<div className="register-logo">
					<h2 className="register-title">Register Demo</h2>
				</div>
				<Form onSubmit={this.handleSubmit} className="register-form">
					<FormItem {...formItemLayout} label="User Name" hasFeedback>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input />
							)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="Password"
						hasFeedback
					>
						{getFieldDecorator('password', {
							rules: [{
								required: true, message: 'Please input your password!',
							}, {
								validator: this.checkConfirm,
							}],
						})(
							<Input type="password" />
							)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="Confirm Password"
						hasFeedback
					>
						{getFieldDecorator('confirm', {
							rules: [{
								required: true, message: 'Please confirm your password!',
							}, {
								validator: this.checkPassword,
							}],
						})(
							<Input type="password" onBlur={this.handleConfirmBlur} />
							)}
					</FormItem>
					<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
						{getFieldDecorator('agreement', {
							valuePropName: 'checked',
						})(
							<Checkbox>I have read the <a href="">agreement</a></Checkbox>
							)}
					</FormItem>
					<FormItem {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">Register</Button>
						<label style={{ marginLeft: 30 }}>Or <Link to="/login">Login</Link></label>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const Register = Form.create()(RegistrationForm);

export default Register;
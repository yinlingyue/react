import React from 'react';
import { Form, Input, Row, Col, Menu, Icon, Button, Modal, Tabs, notification} from 'antd';
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class HeaderComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			categoryItems: [],
			isLogin: false,
			showModal: false,
			selectKey: []
		}
	}

	componentDidMount() {
		fetch('/mock/category.json').then((response)=>{
			return response.json();
		}).then((json) => {
			this.setState({
				selectKey: ['category_'+json.data.categories[0].category_id],
				categoryItems: json.data.categories
			})
		});
	}

	handleCategorySelect(event) {
		this.setState({
			selectKey: [event.key]
		}); 
	}

	handleLoginClick() {
		this.setState({
			showModal: true
		});
	}

	handleModelCancel() {
		this.setState({
			showModal: false
		});
	}

	handleLoginSubmit(e) {
		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	       	var link = '?username='+ values.userName + '&password=' + values.password;
			fetch('/mock/login.json'+ link).then((response)=>{
					return response.json();
				}).then((json) => {
					if (json.data.login) {
						this.setState({
							showModal: false,
							isLogin: true
						})
					}else {
						notification.open({
						    message: '兄弟，密码错啦',
						    description: '再拉一次吧',
						});
					}
				});
	       }
	    });
	}

	render() {

		const { getFieldDecorator } = this.props.form;

		var loginArea;

		if (this.state.isLogin) {
			loginArea = <Button type="primary" className="log-reg-btn">注销</Button>;
		}else {
			loginArea = <Button type="primary" onClick={this.handleLoginClick.bind(this)} className="log-reg-btn">登录/注册</Button>;
		}

		return (
			<div>
				<Row>
			    	<Col span={4}>
			    		<img src="/images/logo.png" className='logo'/>
			    	</Col>
			     	<Col span={15}>
						<Menu mode="horizontal" className="category-menu" selectedKeys={this.state.selectKey} onSelect={this.handleCategorySelect.bind(this)}>
  							{
  								this.state.categoryItems.map((value, index) => {
  									return <MenuItem key={'category_' + value.category_id}><Icon type={value.icon} />{value.category_name}</MenuItem>
  								})
  							}
						</Menu>
			     	</Col>
			     	<Col span={5}>
			    		{loginArea}
			    	</Col>
			    </Row>

			    <Modal title="登陆／注册" visible={this.state.showModal} footer={null} onCancel={this.handleModelCancel.bind(this)}>
		        	<Tabs defaultActiveKey="login">
						<TabPane tab="登陆" key="login">
							<Form className="login-form" onSubmit={this.handleLoginSubmit.bind(this)}>
								<FormItem>
							        {getFieldDecorator('userName', {
							          rules: [{ required: true, message: '请输入用户名' }],
							        })(
							            <Input placeholder="Username" />
							          )}
							    </FormItem>
							    <FormItem>
							          {getFieldDecorator('password', {
							            rules: [{ required: true, message: '请输入密码' }],
							          })(
							            <Input type="password" placeholder="Password" />
							          )}
							    </FormItem>
							    <FormItem>
							          <Button type="primary" htmlType="submit" className="login-form-button">
							             登陆
							          </Button>
							    </FormItem>
							</Form>
						</TabPane>
						<TabPane tab="注册" key="register">注册</TabPane>
				 	</Tabs>
		        </Modal>


			</div>
		)
	}


}

 export default Form.create()(HeaderComponent);



import React, { Component } from 'react';
import { Layout, Input, Form, Button, Divider, message, notification}  from 'antd'
import { withRouter } from 'react-router-dom'
import '@/style/view-style/login.scss'


class Login extends Component {
    state = { 
        loading: false, // 默认的加载效果
     }
     enterLoading = () => {
         this.setState({
            loading: true
         })
     }

    // 组件渲染结束
    componentDidMount() {
        notification.open({
            message: '欢迎使用后台管理平台',
            duration: null,
            description: '账号 admin(管理员) 其他(游客) 密码随意'
        })
    }
    
    // 组件移除 已移出真实 DOM 防止报错，
    componentWillUnmount() {
        notification.destroy() // 提示语销毁
        this.timer && clearTimeout(this.timer)
    }
    handleSubmit = (e) => {
        console.log('开始登录8989')
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            console.log(values, '开始提交的数据')
            if (!err) {
                switch(values.username) {
                    case 'admin':
                        values.auth = 0
                        break
                    default:
                        values.auth = 1
                }
                localStorage.setItem('user', JSON.stringify(values))
                this.enterLoading() // 加载效果开启
                this.timer = setTimeout(() =>{
                    message.success('登录成功')
                    this.props.history.push('/')
                })
            }
        })
    }
    render() { 
        const { getFieldDecorator } = this.props.form
        return (  
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>REACT后台管理系统</h3>
                        <Divider></Divider>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('username',{
                                    rules: [{ required: true, message: '请输入用户名!' }]
                                })(
                                    <Input placeholder='用户名'></Input>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password',{
                                    rules: [{ required: true, message: '请输入密码!' }]
                                })(
                                    <Input  type='password' placeholder='密码'></Input>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Button
                                 type='primary'
                                 htmlType='submit'
                                 className='login-form-button'
                                 loading={this.state.loading}
                                >登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </Layout>
        );
    }
}
 
export default withRouter(Form.create()(Login))


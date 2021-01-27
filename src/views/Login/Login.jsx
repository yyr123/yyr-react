import React, { Component } from 'react';
import { Layout, Input, Form, Button, Divider, message, notification}  from 'antd'
import { withRouter } from 'react-router-dom'


class Login extends Component {
    state = {  }
    render() { 
        return (  
            <Layout className='login animated fadeIn'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>REACT后台管理系统</h3>
                    </div>
                </div>

            </Layout>
        );
    }
}
 
export default withRouter(Form.create()(Login))


// 公共的头部
import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Dropdown, Layout, Row, Col, Button} from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'

const { Header } = Layout

// 通过传参数的形式创建组件
const AppHeader = props => {
    const { menuToggle, menuClick, loginOut } = props  // 传出去的组件用props
    const dropMenu = (
        <Menu>
            <Menu.ItemGroup title='用户设置'>
                <Menu.Divider />
                <Menu.Item>
                    个人设置
                </Menu.Item>
                <Menu.Item>
                    系统设置
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Divider />
            <Menu.Item>
                <span onClick={loginOut}>
                    退出登录
                </span>
            </Menu.Item>
        </Menu>
    )
    return ( 
        <Header className='header'>
            <Row style={{width: '100%'}}>
                <Col span={12}>
                    <Button type="primary" onClick={menuClick}>
                        {React.createElement(menuToggle ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <Dropdown overlay={dropMenu}>
                        <span style={{fontSize: '14px'}}>个人设置</span>  
                    </Dropdown>
                </Col>
            </Row>
        </Header> 
    );
}

AppHeader.prototypes = {
    menuClick: PropTypes.func, // 点击事件
    menuToggle: PropTypes.bool, // 是否点击了收起和展开
    loginOut: PropTypes.func, // 退出登录
}
 
export default AppHeader;
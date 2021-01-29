// 侧边栏导航
import React from 'react';
import PropTypes  from  'prop-types'
import { Layout }  from 'antd'
// 封装的导航组件
import { GithubOutlined } from '@ant-design/icons' // 按需引入icon
import CustomMenu from '@/components/CustomMenu'


const { Sider } = Layout
const AppAside = props => {
    let { menuToggle, menu } = props // 要传出去的值
    return (
        <Sider className='aside' collapsed={menuToggle}>
            <div className='logo'>
                <a rel='noopener noreferrer' href='https://github.com/ltadpoles' target='_blank'>
                    <GithubOutlined />
                    {/* <Icon type='github' style={{ fontSize: '3.8rem', color: '#fff' }} /> */}
                </a>
            </div>
            {/* 导航的数据 */}
            <CustomMenu menu={menu}></CustomMenu>
        </Sider>
    )
}

AppAside.propTypes = {
    menuToggle: PropTypes.bool,
    menu: PropTypes.array.isRequired
}


export default AppAside;
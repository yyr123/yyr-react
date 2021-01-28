// 公共的头部
import React from 'react';
import PropTypes from 'prop-types'
import { Menu, Dropdown, Layout, Row, Col, Avatar, Badge } from 'antd'

const { Header } = Layout
class AppHeader extends  React.Component {
    state = {  }
    render() { 
        return ( 
        <Header className='header'>
            <Row>
                <Col span={8}>
                    左边
                </Col>
                <Col span={8}>
                    右边
                </Col>
            </Row>

        </Header> );
    }
}
 
export default AppHeader;
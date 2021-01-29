import React, { Component } from 'react';
import { Layout, Row, Col, Divider } from 'antd'
import '@/style/view-style/index.scss'
import { FullscreenOutlined } from '@ant-design/icons'
// 引入全屏展示组件
import screenfull from 'screenfull'


import FirstLine from './line.jsx'
import Bar from './bar.jsx'

class Index extends Component {
    state = {  }
    fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'))
            // 根据id全屏放大
        }
    }
    render() { 
        return ( 
            <Layout className='index animated fadeIn'>
                <Row gutter={24} className="index-header">
                    <Col span={6}>
                        <div className='base-style wechat'>
                            <div>
                                <span>999</span>
                                <div>微信</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='base-style qq'>
                            <div>
                                <span>666</span>
                                <div>钉钉</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='base-style dingding'>
                            <div>
                                <span>777</span>
                                <div>微信</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='base-style weibo'>
                            <div>
                                <span>888</span>
                                <div>微博</div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <div className='base-style'>
                        <div className='bar-header'>
                            <div>图形全屏展示</div>
                            <FullscreenOutlined onClick={this.fullToggle}/>
                        </div>
                        <Divider/>
                        <Bar/>
                    </div>
                    </Col>
                </Row>
                {/* 折线图 */}
                <FirstLine/>
            </Layout>
         );
    }
}
 
export default Index;
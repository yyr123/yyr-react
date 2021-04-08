import React, {Component, Fragment} from 'react'
import { 
 Carousel,
 Collapse,
 Divider,
 Descriptions,
 Empty,
 Button,
 Tabs,
 Progress,
 Col,
 Row,
 Anchor,
 Tree
} from 'antd'


const { Panel } = Collapse
const { TabPane } = Tabs
const { Link } = Anchor

const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            disabled: false,
            children: [
              {
                title: 'leaf',
                key: '0-0-0-0',
                disableCheckbox: false,
              },
              {
                title: 'leaf',
                key: '0-0-0-1',
              },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
          },
        ]
    }
    
]


class  IconView  extends Component {
    state = { 
        contentStyle: {
            height: '160px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
        }
      }

    // 折叠面板操作
    backChange = (key) =>{
        // 这里是数组，点开的话就是被展开的索引数组集合
        console.log(key, '面板开始点开')
    }

    tabChange = (e) =>{
        console.log(e, '导航开始点击打印的key值')
    }

    treeSelect = (e) =>{
        console.log(e, '选择的树')
    }

    render() { 
        const { contentStyle } = this.state
        return ( 
            <Fragment>
                {/* 这里申明的id是不对的，对于锚点来说，锚点跳转的是组件的id */}
                <div id="Link-Props">这里是顶部的锚点</div> 

                <Tabs defaultActiveKey="1" onChange={this.tabChange}>
                    <TabPane tab="用户设置" key="1">
                        标签一
                    </TabPane>
                    <TabPane tab="官网设置" key="2">
                        标签二
                    </TabPane>
                    <TabPane tab="开始设置" key="3">
                        标签三
                    </TabPane>
                </Tabs>

                <h5 style={{marginTop: '20px'}}>这里是轮播图</h5>
                <Carousel afterChange={this.afterChange} style={{width: '400px'}}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                </Carousel>
                <Divider></Divider>
                <h5>这里是折叠面板</h5>
                <Collapse
                defaultActiveKey={['1']}
                onChange={this.backChange}
                >
                    <Panel header="这里第一个" key="1">
                        <p>第一个文本</p>
                    </Panel>

                    <Panel header="这里第二个" key="2">
                        <p>第二个文本</p>
                    </Panel>

                    <Panel header="这里第三个" key="3">
                        <p>第三个文本</p>
                    </Panel>
                </Collapse>

                
                {/* 树选择 */}
                <div style={{padding: '20px', margin: '20px', border: '1px solid red'}}>
                    <h5>这里是树选择</h5>
                    <Tree
                    onSelect={this.treeSelect}
                    onCheck={this.treeCheck}
                    treeData={treeData}
                    >
                    </Tree>
                </div>

                {/* 描述列表 */}
                {/* vertical layout="vertical" 垂直方向 默认是水平方向 */}
                <Descriptions  title="订单信息" >
                    <Descriptions.Item label="订单编号">867989</Descriptions.Item>
                    <Descriptions.Item label="订单长号">1363910396717654016</Descriptions.Item>
                    <Descriptions.Item label="支付单号">1363910396717654016</Descriptions.Item>
                    <Descriptions.Item label="订单支付类型" >汇付一般贸易支付订单</Descriptions.Item>
                    <Descriptions.Item label="资金贸易号" span={2}>U07212102230695433401664</Descriptions.Item>
                    <Descriptions.Item label="套餐类型" >单品</Descriptions.Item>
                </Descriptions>

                {/* 空状态的 */}
                <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{height: 60}} 
                description={
                    <span>这里是描述的字段</span>
                }>

                    <Button type="primary">
                        点击进行其他操作
                    </Button>
                </Empty>

                {/* 进度条  active正在进行中  showInfo  是否展示百分比  
                type 展示的类型形状  line circle dashboard（百分比在中间）*/}

                <Row>
                    <Col span={8}>
                        <Progress percent={30} showInfo={true} steps={5} strokeColor="#52c41a"></Progress>
                    </Col>
                    <Col span={6}>
                        <Progress percent={30} status="active" showInfo={true}></Progress>
                    </Col>
                    <Col span={10}>
                        <Progress style={{marginLeft: '60px'}} type="dashboard" percent={30} status="active" showInfo={true}></Progress>
                    </Col>
                </Row>

                <Anchor>
                    <Link href="#Link-Props" title="测试锚点" />
                </Anchor>

                <div style={{marginBottom: '50px'}}></div>
            </Fragment>
         );
    }
}
 
export default IconView;

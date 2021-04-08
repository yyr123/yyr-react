import React, { Component } from 'react';
import { 
  Form, 
  Input, 
  InputNumber, 
  DatePicker, 
  Upload, 
  Select, 
  Space, 
  Row, 
  Col, 
  Button, 
  Radio,
  TreeSelect,
  Cascader,
  Checkbox,
  Rate, // 评分
  Switch, // 开关
  Modal, // 对话框
  // Badge,
  Tag,
  Timeline,
  Image,
  message,
  Divider,
  Avatar,
  List,
  } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import moment from 'moment'
import './index.scss'


// moment 刚引入报错 主要是时间插件

const { RangePicker } = DatePicker
const { Option} = Select

// 树形数据的选择
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
]

// 级联数据的选择

const options = [
  {
    value: '1',
    label: 'Zhejiang',
    children: [
      {
        value: '1-2',
        label: 'Hangzhou',
        children: [
          {
            value: '1-3',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Jiangsu',
    children: [
      {
        value: '2-1',
        label: 'Nanjing',
        children: [
          {
            value: '2-2',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  }
]


// 复选框文件的数据
const checkOptions = [
  { label: 'Apple', value: '1' },
  { label: 'Pear', value: '2' },
  { label: 'Orange', value: '3', disabled: false },
]


class TableDetail extends Component {
    // 组件加载完成
    componentDidMount() {
      console.log('组件开始加载898')
    }
    // 初始化定义变量
    state = { 
      loading: false, // 保存按钮加载效果
      dataForm: {
        startTime: null, // 发布开始时间
        endTime: null, // 发布结束时间
        treeVal: null, // 树形选择的数据
        shopOpen: false, // 默认是关闭的
      }, // 提交的对象 先进行存储
      imageUrl: null, // 上传的图片
      imgLoading: false, // 图片上传加载
      fileList: [], //  上传的列表

      isShowModal: false, //  是否显示弹窗
      // 编辑标签的变量
      tags: ['Unremovable', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
     } 

    onFinish = (value) => {
      let newDataForm = this.state.dataForm
      newDataForm.startTime = this.state.startTime
      newDataForm.endTime = this.state.endTime

      // Object.assign 合并对象
      this.setState({
        dataForm: Object.assign(newDataForm, value)
      })
      // 开始请求接口
      console.log(this.state.dataForm, '最终的数据')

    }
    timeChange = (data, dateStrings) => {
      // dateStrings 是直接打印出来时间  data 是把原型打印出来、
      console.log(data, dateStrings, '选择的时间数据')
      console.log(dateStrings[0], '所有的数据')
      if (dateStrings) {
        this.setState({
          startTime: dateStrings[0],
          endTime: dateStrings[1]
        })
      }
    }
    handleChange = ({ fileList }) => {
      console.log(fileList, '上传的文件')
      let imgList = [] // 设置新的数组

      // map循环，报警告Expected to return a value in arrow function

      // 解决方案：
      // 使用forEach代替map，因为ESlint报这个警告是因为map, filter , reduce 需要返回值
      // 也可以使用map,在react中用jsx的方式，直接把{}改成()

      fileList.forEach((item, key) => {
        if (item.response && item.response.success) {
          console.log('item.response当个图片的响应', item.response)
           imgList.push(item.response.url)
        }
      })
  
    } 

    // 一般使用箭头函数 判断上传之前文件的大小
    beforeUpload = (file) =>{
      console.log(file, '上传之前的文件')
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        message.info('请选择正确的格式')
      }

      const isLimt1M = file.size / 1024 /1024 < 1
      if (!isLimt1M) {
       message.info('上传不能超过1M')
      }
      return isJPG && isLimt1M
    }

    selectChange = (data) => {
      console.log(data, '选择的数据')
    }

    onSearch = (data) => {
      console.log(data, '搜索的数据')
    }

    radioChange = (e) => {
      console.log((e.target.value), '选择的数据')
    }

    treeChange = (e) => {
      console.log(e, '数据分类的数据')
    }

    cascaderChange = (e) => {
      console.log(e, '选择的省市区数据')
    }

    checkChange = (e) =>{
      console.log(e, '复选框选中的值')
    }

    switchChange = (e) => {
      console.log(e, '开关切换的状态')
    }

    showModal = () =>{
      console.log('点击出现对话框')
      this.setState({
        isShowModal: true
      })
    }

    // 确认弹窗按钮
    modalOk = () => {
      // this.setState({
      //   isShowModal: false
      // })
    }

    // 关闭弹窗按钮
    modalCancel = () => {
      this.setState({
        isShowModal: false
      })
      
    }

    // 编辑输入框发生改变
    handleEditInputChange = () => {
      console.log('开始发生变化')
    }

    // 输入框开始确认
    handleEditInputConfirm = () =>{
      console.log('输入框开始确认')
    }


    diaFinish = (val) => {
      console.log(val, '开始提交数据')
      if(val) {
        message.info('表单数据提交成功')

        this.setState({
          isShowModal: false
        })
      }
    }


    render() { 
        const { fileList, tags, editInputIndex, editInputValue, inputVisible,  inputValue, isShowModal} = this.state 
        // 上传图片的按钮
        const uploadButton = (
          <div>
            { this.state.imgLoading ? <LoadingOutlined/> : <PlusOutlined/> }
            <div style={{marginTop: '8px'}}>上传图片</div>
          </div>
        )

        return ( 
            <Form 
             name="form"
             className="form-content"
             onFinish={this.onFinish}
            // 在这里设置表单元素的默认值，defaultval报错且无效

            // 设置表单初始值  name: 值
             initialValues={{mutileCheck: ['Pear'], rate: 2.5, }}

            //  submit这个方法最新版本操作太复杂
            //  onSubmit = {this.handleSubmit}
             >

               {/* headers 先设置请求头 */}

               <Row>
                 <Col span={12}>
                  <FormItem 
                   label="商品主图"
                  >
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      fileList={fileList}
                      headers = "{Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyIiwiZXhwIjoxNjE1NDMwODEzLCJpYXQiOjE2MTUzNDQ0MTMsInVzZXJJZCI6OTl9.VgDyELhkmSC9Jd1OX6fMPTSNCOUwix-1vHj2_kmk36g'}"
                      showUploadList={false}
                      action="https://test-admin.whalecomemall.com/oss/upload"
                      onChange={this.handleChange}
                      beforeUpload ={this.beforeUpload}
                    >
                      {this.state.fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                  </FormItem>
                  <FormItem 
                    label="品牌名称"
                    name="brandName"
                    rules={[{
                      required: true, message: '品牌名称不能为空!'
                    }]}
                    >
                      <Input value={this.state.dataForm.brandName} placeholder="请输入"/>
                  </FormItem>
                  <FormItem 
                    label="货品条码"
                    name="brandCode"
                    rules={[{
                      required: true, message: '货品条码不能为空!'
                    }]}>
                      <InputNumber value={this.state.dataForm.brandName} placeholder="请输入"/>
                  </FormItem>
                  <FormItem
                    label="选择类型"
                    name="isOpen"
                    rules={[{
                      required: true, message: '类型不能为空!'
                    }]}
                    >
                      {/* defaultValue 默认的值 */}
                      <Radio.Group onChange={this.radioChange} >
                        <Radio value={1}>第一个选项</Radio>
                        <Radio value={2}>第二个选项</Radio>
                        <Radio value={3}>第三个选项</Radio>
                      </Radio.Group>
                  </FormItem>
                  <FormItem 
                   label="自定义弹窗"
                  >
                    <Button onClick={this.showModal}>点击出现弹窗</Button>
                  </FormItem>
                 </Col>
                 <Col span={12}>
                    <FormItem 
                      label="发布时间"
                      rules={[{
                        required: true, message: '发布时间不能为空!'
                      }]}
                    >
                      <Space direction="vertical" size={12}>
                        {/* format 精确到分秒 */}
                          <RangePicker
                            ranges={{
                              Today: [moment(), moment()],
                              'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={this.timeChange}
                          />
                        </Space>
                    </FormItem>
                    <FormItem
                      label="仓库"
                      name="wareHouse"
                      rules = {
                        [{required: true, message: '仓库不能为空'}]
                      }
                     >

                       <Select
                        mode="multiple" // 支持多选
                        showSearch // 支持模糊搜索匹配
                        style={{width: '200px'}}
                        placeholder="请选择仓库"
                        optionFilterProp="children"
                        onChange={this.selectChange}
                        onSearch={this.onSearch}
                        filterOption = {(input, option) => {
                          console.log(option, input, '输入的数据')
                          console.log(option.children.indexOf(input) >= 0)
                          // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}
                       >
                         <Option value="1">jaak</Option>
                         <Option value="2">eva</Option>
                         <Option value="3">kkl</Option>
                       </Select>
                    </FormItem>
                    {/* 树选择 */}
                    <FormItem
                      label="分类选择"
                      name="treeVal"
                      rules={[{
                        required: true, message: '分类选择不能为空'
                      }]}
                     >

                       {/* treeDefaultExpandAll 默认是展开所有的

                       showSearch 支持搜索
                       allowClear 允许清空
                       multiple 允许多选
                        */}
                       <TreeSelect
                        showSearch
                        value={this.state.dataForm.treeVal}
                        treeData={treeData}
                        placeholder="请选择分类"
                        // treeDefaultExpandAll
                        // multiple
                        // allowClear
                        onChange={this.treeChange}
                       >
                       </TreeSelect>
                    </FormItem>
                    {/* 级联选择器 */}
                    <FormItem 
                    label="选择省市区"
                    name="area"
                    rules={
                      [{
                        required: true, message: '省市区不能为空!'
                      }]
                    }
                    >

                      {/* options 级联的数据 */}
                      <Cascader
                        options={options}
                        onChange={this.cascaderChange}
                        placeholder="请选择省市区"
                      >
                      </Cascader>
                    </FormItem>
                    {/* 复选框 */}
                    <FormItem 
                    label="单个复选框"
                    name="mutileCheck"
                    >
                    <Checkbox.Group
                      options={checkOptions}
                      // defaultValue={['Pear']}
                      onChange={this.checkChange}
                      >
                    </Checkbox.Group>
                      {/* defaultChecked  默认是选中 defaultChecked={false} 不选中  */} 
                      {/* <Checkbox defaultChecked={false} disabled>只有一个选项</Checkbox> */}

                      {/* defaultValue 多选的话是数组显示 报错格式不正确 */}
                    
                    </FormItem>
                    <FormItem
                     label="评分"
                     name="rate"
                    >
                      {/* allowHalf 允许半星 defaultValue={2.5}*/}
                      <Rate allowHalf ></Rate>
                    </FormItem>

                    <FormItem
                     label="是否开启"
                     name="shopOpen"
                    >
                      <Switch value={this.state.dataForm.shopOpen} onChange={this.switchChange}></Switch>
                    </FormItem>
{/* 
                    <Badge count={5}></Badge> */}
                    {/* 标签添加修改 */}

                    <FormItem
                     label="添加标签"
                     name="tagList"
                     >

                       {/* 标签新增和编辑删除暂时没有实现 待研究 */}
                       {/* 现在开始是表达式 */}
                       {
                         tags.map((tag, index) => {
                            return (
                              <span className="tag-text">{tag}</span>
                            )
                         })
                       }
                    </FormItem>
                 </Col>
               </Row>

              {/* footer={null} 不需要底部 */}
              <Modal 
                title="测试的标题" 
                visible={isShowModal} 
                okText="确认" 
                cancelText="取消" 
                footer={null} // 不需要底部的确认和取消按钮
                onOk={this.modalOk} 
                onCancel={this.modalCancel}>
                  <p>这里是内容啥空数据卡加斯</p>
                  <Form ref="diaForm" onFinish={this.diaFinish}>
                       <FormItem
                        label="标签名字"
                        name="tagName"
                        rules={
                          [{
                            required: true, message: '标签的名字不能为空!'
                          }]
                        }
                       >
                        <Input placeholder="请输入标签名字"></Input>
                       </FormItem>
                       <FormItem
                       label="标签权重"
                       name="tagWeight" 
                       rules={
                        [{
                          required: true, message: '标签权重不能为空!'
                        }]
                      }
                       >
                         <Input placeholder="请输入权重"></Input>
                       </FormItem>
                       <FormItem>
                        <Button   
                        type='primary'
                        htmlType='submit'
                        >开始提交</Button>
                       </FormItem>
                      </Form>
              </Modal>

              {/* 如果按钮不加在 formitem里面的，提交事件要单独绑定 */}
               {/* <Button
               type='primary'
               htmlType="submit"
               onClick={this.handleSubmit}
               loading={this.state.loading}
              >
                保存
               </Button> */}
              <Divider></Divider>

              
              {/* 非表单操作 */}
              {/* 时间轴 */}
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              </Timeline>

              {/* 图片渲染 */}
              {/* 预览图片 */}

              <Image.PreviewGroup>
                <Image
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  >
                </Image>
              </Image.PreviewGroup>

              {/* list 列表展示 */}

              <List
                itemLayout="horizontal"
                dataSource={checkOptions}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.label}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
       
              <Form.Item style={{marginTop: '20px'}}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    loading={this.state.loading}
                  >保存</Button>
              </Form.Item>
            </Form>
         );
    }
}
 
export default TableDetail;
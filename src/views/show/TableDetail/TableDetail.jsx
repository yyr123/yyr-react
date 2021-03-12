import React, { Component } from 'react';
import { Form, Input, InputNumber, DatePicker, Upload, Select, Space, Row, Col, Button, message} from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment'
import './index.scss'


// moment 刚引入报错 主要是时间插件

const { RangePicker } = DatePicker
const { Option} = Select
class TableDetail extends Component {
    // 组件加载完成
    componentDidMount() {
    }
    // 初始化定义变量
    state = { 
      loading: false, // 保存按钮加载效果
      startTime: null, // 发布开始时间
      endTime: null, // 发布结束时间
      dataForm: {}, // 提交的对象 先进行存储
      imageUrl: null, // 上传的图片
      imgLoading: false, // 图片上传加载
      fileList: [], //  上传的列表
     } 

    onFinish = (value) => {
      console.log(value, '提交的数据') // 提交的是对象

      let newDataForm = this.state.dataForm
      newDataForm.startTime = this.state.startTime
      newDataForm.endTime = this.state.endTime
      

      // Object.assign 合并对象
      console.log(newDataForm, '最后的数据')
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
      fileList.map((item, key) => {
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

    render() { 
        const { fileList } = this.state 
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

            //  submit这个方法最新版本操作太复杂
            //  onSubmit = {this.handleSubmit}
             >

               {/* headers 先设置请求头 */}
               <Row >
                 <Col span={12}>

                  <FormItem>
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
                      <Input placeholder="请输入"/>
                    </FormItem>

                    <FormItem 
                    label="货品条码"
                    name="brandCode"
                    rules={[{
                      required: true, message: '货品条码不能为空!'
                    }]}
                    >
                      <InputNumber placeholder="请输入"/>
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
                         <Option value="3">sunny</Option>
                       </Select>
                    </FormItem>
                 </Col>
               </Row>

               <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    loading={this.state.loading}
                  >保存</Button>
              </Form.Item>
              {/* 如果按钮不加在 formitem里面的，提交事件要单独绑定 */}
               {/* <Button
               type='primary'
               htmlType="submit"
               onClick={this.handleSubmit}
               loading={this.state.loading}
              >
                保存
               </Button> */}
            </Form>
         );
    }
}
 
export default TableDetail;
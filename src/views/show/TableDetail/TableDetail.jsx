import React, { Component } from 'react';
import { Form, Input, InputNumber, DatePicker, Space, Row, Col, Button} from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment'
import './index.scss'


// moment 刚引入报错 主要是时间插件

const { RangePicker } = DatePicker
class TableDetail extends Component {
    // 组件加载完成
    componentDidMount() {
    }
    // 初始化定义变量
    state = { 
      loading: false, // 保存按钮加载效果
      startTime: null, // 发布开始时间
      endTime: null, // 发布结束时间
      dataForm: {}, // 提交的对象
     } 
    handleSubmit = () => {
      // 阻止默认
      console.log('保存的数据')
      this.props.form.validateFields((err, value) => {
        console.log(value, '保存的数据1212')
      })
    }

    onFinish = (value) => {
      console.log(value, '提交的数据')
      let lastObj = {}
      // lastObj.startTime = this.state.startTime,
      // lastObj.endTime = this.state.endTime

      this.setState({
        dataForm: Object.assign(lastObj, value)
      })

      setTimeout(() =>{
        console.log(this.state.dataForm, '最终提交的数据')

        // 最后提交的时候，发布时间单独提交
      }, 1000)
      // 开始请求接口
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

    render() { 
        return ( 
            <Form 
             name="form"
             className="form-content"
             onFinish={this.onFinish}

            //  submit这个方法最新版本操作太复杂
            //  onSubmit = {this.handleSubmit}
             >
               <Row >
                 <Col span={12}>
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
                 </Col>
               </Row>

               <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    loading={this.state.loading}
                  >登录</Button>
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
import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd' // 先引入表格组件
import '@/style/view-style/table.scss' // 引入表格样式
import Axios from 'axios';

class Table1 extends Component {
    // 组件加载完成
    componentDidMount() {
        this.getDataList() // 获取数据列表
    }
    state = { 
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex'
            },
            {
                title: '标签',
                dataIndex: 'tags',
                key: 'tags',
                // 编辑标签的样式 
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green'
                            if (tag === 'loser') {
                                color = 'volcano'
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })}
                    </span>
                )
            },
            // 操作栏
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    // record 相当于row.name, 当前行的姓名
                    <span>
                        <Button type='link' onClick={() => this.deleteAction(record)}>删除{record.name}</Button>
                        <Button type='link' onClick={() => this.editHandle(record)}>编辑</Button>
                        <Button type='link' onClick={() => this.changeStatus(record)}>{record.status === 0 ? '启用' : '停用'}</Button>
                    </span>
                )
            }
        ],
        // 表格数据
        data: [],
     }

     getDataList() {
        Axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists').then((data)=> {
            if (data.status === 200) {
                console.log(data, '接口返回的数据')
                data.data.forEach((item) => {
                    item.key = item.id
                    item.tags = ['nice', 'developer']
                    item.status = 0 // 默认都是停用
                })
                this.setState({
                    data: data.data
                })
            }
        })
     }


    //  改变状态
     changeStatus = (record) => {
        console.log(record, '当前的状态')
        // 开始请求接口
        let params = {
            id: 89,
            status: record.status
        }
        let token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VyIiwiZXhwIjoxNjE0MDczNjQ2LCJpYXQiOjE2MTM5ODcyNDYsInVzZXJJZCI6OTl9.AsuTj38R40x7CGL4O-F-BW0Bx1YbJqRzmt-x97dhiw0'
        Axios.post(`http://test-admin.whalecomemall.com/tag/operate`,JSON.stringify(params), {
            headers: { 
                'Content-Type':'application/json',
                'Authorization': `${token}`,
            }}).then((data) => {
                console.log(data, '返回的数据')
                if (data.status === 200) {
                    // 开始更新数据
                    this.getDataList()
                }
            })
     }

    //  react 表格的删除不是根据索引的，是根据唯一值匹配进行删除的
     deleteAction = (row) => {
        console.log(row, '开始删除')
        let {data} = this.state
        data = this.findKey(data, row.key)
        this.setState({
            data: [].concat(data)
        })
    }

    editHandle = (row) => {
        console.log(row, '编辑当前的页面')
    }

    findKey = (data, key) => {
        data.forEach((item, index) => {
            if (item.key === key) {
                // key值匹配的话，进行删除
                data.splice(index, 1)
            }
        });
        return data
    }


    render() { 
        return ( 
            <Table columns={this.state.columns} dataSource={this.state.data} bordered></Table>
         );
    }
}
 
export default Table1;

// 箭头函数后面可以直接跟组件表达式
// const Table1 = () => <Table columns={columns} dataSource={data} bordered></Table>
 
// export default Table1;
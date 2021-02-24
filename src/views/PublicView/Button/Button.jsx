import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd' // 先引入表格组件
import '@/style/view-style/table.scss' // 引入表格样式
import Axios from 'axios';

class Table1 extends Component {
    // 组件加载完成
    componentDidMount() {
        this.getDataList() // 获取数据列表
    }

    getDataList() {

        this.setState({
            loading: true, //开始加载
        })
        Axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists').then((data)=> {
        if (data.status === 200) {
            console.log(data, '接口返回的数据')
            data.data.forEach((item) => {
                item.key = item.id
                item.tags = ['nice', 'developer']
                item.status = 0 // 默认都是停用
                item.description =  '这里是新的描述' + item.status
            })
            this.setState({
                data: data.data,
                loading: false
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
        this.props.history.push('/show/TableDetail')
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

    // 初始化定义变量
    state = { 
        selectedRowKeys: [], // 所有选择的表格
        // 表格数据
        data: [],
        loading: false, // 表格是否加载中
     }

    //  选择发生变化
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        // 只要赋值之后才能选中按钮
        // setState 注意react的页面真正开始渲染，只有setState之后，页面才会开始渲染
        this.setState({ selectedRowKeys })
    }

    render() { 
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
        }
        const  columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                textAlign:'center',
                // fixed: 'left', //固定在左边
                // 可以根据名称进行过滤, 先设置可以选择过滤的内容
                filters: [
                    {
                        text: '小红',
                        value: '小红'
                    },
                    {
                        text: '小明',
                        value: '小明'
                    },
                ],
                onFilter: (value, record) => record.name.indexOf(value) === 0, 
                // 等于0的话说明符合，不等于0的话就是不符合，这就是indexOf的使用方法，只展示过滤出来的数据
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.age - b.age,
                // sortDirections: ['ascend', 'descend', 'ascend'], // 设置为只有升序和降序，这样就禁止恢复为默认的排序
                // sortDirections: ['descend', 'ascend'], // 这样就会有三种排序，降序, 默认的排序， 升序, 点击的顺序就是这样切换
                // sortDirections: ['descend'], // 只有一个选项是降序
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
                width: 100,
                fixed: 'right',
                render: (text, record) => (
                    // record 相当于row.name, 当前行的姓名
                    <span>
                        <Button type='link' onClick={() => this.deleteAction(record)}>删除{record.name}</Button>
                        <Button type='link' onClick={() => this.editHandle(record)}>编辑</Button>
                        <Button type='link' onClick={() => this.changeStatus(record)}>{record.status === 0 ? '启用' : '停用'}</Button>
                    </span>
                )
            }
        ]

        // rowSelection 复选框设置的规则
        return ( 
            <Table 
            className="components-table-demo-nested"
            rowSelection = {{
                type: 'checkbox',
                ...rowSelection
            }}
            rowKey="id" // 可以直接在这边设置唯一值
            columns = {columns} 
            expandable ={{
                expandedRowRender: record => <p style={{marginLeft: '10px'}}>{record.name}</p>,
                rowExpandable: record => record.name !== 'Not Expandable',
            }} 
            loading = {this.state.loading}
            dataSource = {this.state.data}
            bordered 
            scroll = {{x: 1300}}></Table>
         );
    }
}
 
export default Table1;

// 有时组件无效，看下ui版本。更新一下版本

// 箭头函数后面可以直接跟组件表达式
// const Table1 = () => <Table columns={columns} dataSource={data} bordered></Table>
 
// export default Table1;
import React from 'react';
import { Table, Tag, Button } from 'antd' // 先引入表格组件
import '@/style/view-style/table.scss' // 引入表格样式


const deleteAction = (row) => {
    console.log(row, '开始删除')
    let index = Number(row.key) - 1
    console.log(index, '当前的索引')
    data.splice(index, 0) // 这里不能操作删除数据

    console.log(data, '剩下的数据')
}

// 表格表头参数
const columns = [
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
        title: '地址',
        dataIndex: 'address',
        key: 'address'
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
                <Button type='link' onClick={() => deleteAction(record)}>删除{record.name}</Button>
                <Button type='link'>编辑</Button>
                <Button type='link'>查看</Button>
            </span>
        )
    }
]

// 表格数据
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    }
]


// 箭头函数后面可以直接跟组件表达式
const Table1 = () => <Table columns={columns} dataSource={data} bordered></Table>
 
export default Table1;
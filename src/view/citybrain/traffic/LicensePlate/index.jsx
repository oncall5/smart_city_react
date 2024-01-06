import React from 'react'
import {useState} from 'react'
import {Space,Card,Tag,Table} from 'antd'
export default function LicensePlate() {
  const [conditions,setConditions] = useState({})
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: '识别车牌',
      dataIndex: 'getnumber',
    },
    {
      title: '真实车牌',
      dataIndex: 'realnumber',
    },
    {
      title: 'Y/N',
      dataIndex: 'result',
    },
    {
      title: '图片',
      dataIndex: 'url',
      width: 180,
      render: (text, record) => (
        <img src={record.url} alt="图片" style={{ width: '150px', height: '50px' }} />
      ),
    },
  ];
  const [dataList,setDataList] = useState([{ name: 'dievice_0001' }, { name: 'dievice_0002' }])
  return (
    <div>
      <Card bordered={false} >
        <Space size={[0, 8]} wrap>
          <Tag color="#f50" style={{ marginRight: '20px' }}>总数据量:{ conditions.sum }</Tag>
          <Tag color="#2db7f5" style={{ marginRight: '20px' }}>识别正确据量::{conditions.right}</Tag>
          <Tag color="#87d068" style={{ marginRight: '20px' }}>修复成功数量:{conditions.error}</Tag>
          <Tag color="#108ee9" style={{ marginRight: '20px' }}>所有修复数量:{conditions.conversion}</Tag>
        </Space>
      </Card>
      <Table
      dataSource={dataList}
      columns={columns}
      bordered
      rowKey={(record, index) => index}
      pagination={true}
      scroll={{ y: 880 }}
      style={{ width: '100%' }}
    />
    </div>
  )
}

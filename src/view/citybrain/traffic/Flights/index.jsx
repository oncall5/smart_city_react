import React from 'react'
import { useState, useEffect } from 'react'
import { Tag, Space, Card, Table, Pagination } from 'antd';
import { comm } from "../../../../global/common";
import axios from '../../../../api/axios'
export default function Flights() {
  const [datas, setdatas] = useState([{id:1}])
  const [queryInfo, setqueryInfo] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 20,
  })
  const [conditions, setconditions] = useState([])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true
    },
    {
      title: '经度',
      dataIndex: 'lng',
      ellipsis: true
    },
    {
      title: '纬度',
      dataIndex: 'lat',
      ellipsis: true
    },
    {
      title: '转换值',
      dataIndex: 'conversiondata',
      ellipsis: true
    },
    {
      title: '真实值',
      dataIndex: 'realdata',
      ellipsis: true
    },
    {
      title: '转换是否正确',
      dataIndex: 'result',
      ellipsis: true
    }
  ]
  const queryDatas = () => {
    let parmas = {
      page: queryInfo.pageNum,
      pageSize: queryInfo.pageSize
    }
    axios.$get(comm.WEB_URL + '/citybrain/gpsaddress/getGpssAddress', parmas).then(res => {
      axios.$get(comm.WEB_URL + 'citybrain/gpsaddress/getCount').then(res => {
        setqueryInfo(queryInfo => ({
          ...queryInfo,
          total: res
        }))
      })
      setdatas(res)
    }).catch(error => {
      // 请求失败处理逻辑
      console.error("error111", error);
    })
  }
  const getQuota = () => {
    axios.$get(comm.WEB_URL + 'citybrain/gpsaddress/getQuota').then(res => {
      const updataConditions = {
        ...res,
        error: res.sum - res.right,
        conversion: (res.right * 100 / res.sum).toFixed(3),
      };
      setconditions(updataConditions)
    }).catch(error => {
      // 请求失败处理逻辑
      console.error("error", error);
    })
  }
  const handleSizeChange = (val) => {
    setqueryInfo(queryInfo => ({
      ...queryInfo,
      val: val
    }))
    queryDatas();
  }
  const handleCurrentChange = (val) => {
    setqueryInfo(queryInfo => ({
      ...queryInfo,
      pageNum: val
    }))
    queryDatas();
  }
  useEffect(() => {
    queryDatas()
    getQuota()
  }, [])
  return (
    <div>
      <Card bordered={false} >
        <Space size={[0, 8]} wrap>
          <Tag color="#f50" style={{ marginRight: '20px' }}>总数据量:{conditions.sum}</Tag>
          <Tag color="#2db7f5" style={{ marginRight: '20px' }}>识别正确据量:{conditions.right}</Tag>
          <Tag color="#87d068" style={{ marginRight: '20px' }}>识别错误数据量:{conditions.error}</Tag>
          <Tag color="#108ee9" style={{ marginRight: '20px' }}>数据转换率:{conditions.conversion}</Tag>
        </Space>
      </Card>
      <Card bordered={false}>
        <Table columns={columns} dataSource={datas} />
      </Card>
      <Pagination
        showQuickJumper
        defaultCurrent={queryInfo.pageNum}
        total={queryInfo.total}
        pageSize={queryInfo.pageSize}
        onChange={handleCurrentChange}
        onShowSizeChange={handleSizeChange}
        pageSizeOptions={[10, 20, 50, 100,200]}
        showSizeChanger="true"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
      
    </div>
  )
}

import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { comm } from "../../../../global/common";
import { Card, Tag, Space, Button, Tooltip,Pagination,Table } from 'antd'
import axios from '../../../../api/axios'

import './style.less'
import {
  FundViewOutlined
} from '@ant-design/icons';
export default function Trajectory_detection() {
  const history = useHistory()
  const [detectionMetric, setDetectionMetric] = useState({})
  const [datas, setdatas] = useState([])
  const columns = [
    {
      title: '索引',
      dataIndex: 'index',
      ellipsis: true
    },
    {
      title: '轨迹点数',
      dataIndex: 'complete_len',
      ellipsis: true
    },
    {
      title: '异常轨迹点数量',
      dataIndex: 'true_anomaly',
      ellipsis: true
    },
    {
      title: '检测到的异常点数量',
      dataIndex: 'pred_anomaly',
      ellipsis: true
    },
    {
      title: '待修复轨迹点数',
      dataIndex: 'repair_len',
      ellipsis: true
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 150,
      render: (text, record) => {
        return (
          <Tooltip placement="top" title={"查看详情"} arrow='false'>
            <Button
              icon={<FundViewOutlined />}
              onClick={() => gotoTrajDetailData(record)}></Button>
          </Tooltip>
        )
      }
    }
  ]
  const [queryInfo, setqueryInfo] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 20,
  })
  
  const gotoTrajDetailData = (val) => {
    console.log("val", val)
    history.push({
      pathname: "/dataclean/citybrain/traffic/trajectoryDetail",
      state: { index: val.index }
    })
  }
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
  }, [])
  return (
    <div className="trajectory-detection">
      <Card bordered={false} className="quota-container">
        <Space size={[0, 8]} wrap>
          <Tag color="#f50" style={{ marginRight: '20px' }}>检测召回率{detectionMetric.r}</Tag>
          <Tag color="#2db7f5" style={{ marginRight: '20px' }}>检测精确率率{detectionMetric.p}</Tag>
          <Tag color="#87d068" style={{ marginRight: '20px' }}>检测f1:{detectionMetric.f1}</Tag>
          <Tag color="#108ee9" style={{ marginRight: '20px' }}>所有异常轨迹点数量:{detectionMetric.true_anomaly}</Tag>
          <Tag color="#f50" style={{ marginRight: '20px' }}>检测到的轨迹异常点数量{detectionMetric.pred_anomaly}</Tag>
          <Tag color="#2db7f5" style={{ marginRight: '20px' }}>所有轨迹点数量{detectionMetric.length}</Tag>
        </Space>
      </Card>
      <Card bordered={false}>
        <Table columns={columns} dataSource={datas} />
      </Card>
      {/* <Pagination
        showQuickJumper
        defaultCurrent={queryInfo.pageNum}
        total={queryInfo.total}
        pageSize={queryInfo.pageSize}
        onChange={handleCurrentChange}
        onShowSizeChange={handleSizeChange}
        pageSizeOptions={[10, 20, 50, 100, 200]}
        showSizeChanger="true"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      /> */}
    </div>
  )
}

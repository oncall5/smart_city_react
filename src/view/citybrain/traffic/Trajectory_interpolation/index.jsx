import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Tag, Space, Card, Table, Pagination, Button, Tooltip } from 'antd';
import { comm } from "../../../../global/common";
import axios from '../../../../api/axios'
import { useHistory } from 'react-router-dom';
import {
  FundViewOutlined
} from '@ant-design/icons';
export default function Trajectory_interpolation() {
  const history = useHistory();
  const [datas, setdatas] = useState([{ index: 1 }])
  const [queryInfo, setqueryInfo] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 20,
  })
  const [cleanIndex, setCleanIndex] = useState([])
  const mergedArrow = useMemo(() => {
    return true;
  }, []);
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
      title: '纬度',
      dataIndex: 'lat',
      ellipsis: true
    },
    {
      title: '已有轨迹点数',
      dataIndex: 'train_len',
      ellipsis: true
    },
    {
      title: '待修复轨迹点数',
      dataIndex: 'repair_len',
      ellipsis: true
    },
    {
      title: '转换是否正确',
      dataIndex: 'result',
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
  const gotoTrajDetailData = (val) => {
    console.log("val", val)
    history.push({
      pathname: "/dataclean/citybrain/traffic/trajectoryDetail",
      state: { index: val.index}
    })
  }
  useEffect(() => {
    queryDatas()
    
  }, [])
  return (
    <div>
      <Card bordered={false} >
        <Space size={[0, 8]} wrap>
          <Tag color="#f50" style={{ marginRight: '20px' }}>修复成功率(修复误差小于100米):{cleanIndex.repair_rate}</Tag>
          <Tag color="#2db7f5" style={{ marginRight: '20px' }}>修复失败数量:{cleanIndex.error_repair_count}</Tag>
          <Tag color="#87d068" style={{ marginRight: '20px' }}>修复成功数量:{cleanIndex.correct_repair_count}</Tag>
          <Tag color="#108ee9" style={{ marginRight: '20px' }}>所有修复数量:{cleanIndex.all_repiar_count}</Tag>
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
        pageSizeOptions={[10, 20, 50, 100, 200]}
        showSizeChanger="true"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />

    </div>
  )
}



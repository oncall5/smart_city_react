import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import {Table,Card} from 'antd'
import Map from '../../../map/Map'
import './style.css'
import Map_test from '../../../map/Map_test'
export default function TrajectoryDetail() {
  const location = useLocation();
  console.log('location',location)
  const [data, setData] = useState([{
    time:"Thu, 23 Oct 2008 02:53:04 GMT",
    true_lat:"39.984501",
    true_lng:"116.314907",
    pred_lat:"39.984534879241856",
    pred_lng:"116.31493742764326",
    error:"5",
},{
    time:"Thu, 23 Oct 2008 02:53:04 GMT",
    true_lat:"39.984501",
    true_lng:"116.314907",
    pred_lat:"39.984534879241856",
    pred_lng:"116.31493742764326",
    error:"5",
},{
    time:"Thu, 23 Oct 2008 02:53:04 GMT",
    true_lat:"39.984501",
    true_lng:"116.314907",
    pred_lat:"39.984534879241856",
    pred_lng:"116.31493742764326",
    error:"5",
},{
    time:"Thu, 23 Oct 2008 02:53:04 GMT",
    true_lat:"39.984501",
    true_lng:"116.314907",
    pred_lat:"39.984534879241856",
    pred_lng:"116.31493742764326",
    error:"5",
},{
    time:"Thu, 23 Oct 2008 02:53:04 GMT",
    true_lat:"39.984501",
    true_lng:"116.314907",
    pred_lat:"39.984534879241856",
    pred_lng:"116.31493742764326",
    error:"5",
}])
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      ellipsis: true
    },
    {
      title: '真实纬度',
      dataIndex: 'true_lat',
      ellipsis: true
    },
    {
      title: '真实经度',
      dataIndex: 'true_lng',
      ellipsis: true
    },
    {
      title: '修复纬度',
      dataIndex: 'pred_lat',
      ellipsis: true
    },
    {
      title: '修复经度',
      dataIndex: 'pred_lng',
      ellipsis: true
    },
    {
      title: '误差(米)',
      dataIndex: 'error',
      ellipsis: true
    }
  ]
  return (
    <div className="map-container">
      <Map style={{ width: '100%' }}></Map>
      <Card className="texttable" body-style={{ padding: '0px' }} style={{width: '600px'}}>
        <Table 
        columns={columns} 
        dataSource={data}
        pagination={false}
        sticky
        ></Table>
      </Card>
    </div>
  )
}

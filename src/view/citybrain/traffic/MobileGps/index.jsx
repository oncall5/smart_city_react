import React ,{useEffect,useState}from 'react'
import axios from '../../../../api/axios'
import { Table } from 'antd';
import {comm} from "../../../../global/common";
export default function MobileGps() {
  const [datas,setdatas] = useState([])
  const [sign, setSign] = useState(0);
  const [timer, setTimer] = useState(null);
  const queryDatas = () => {
    axios.$get(comm.WEB_URL + '/citybrain/gpsList').then(res =>{
      setdatas(res)
    }
  )};
  useEffect(() => {
    // 开始轮询
    
    const interval = setInterval(queryDatas, 5000); // 每秒调用一次 queryDatas
    setTimer(interval);
    return () => {
      // 停止轮询
      clearInterval(timer);
    };
  }, []);
  const columns = [
    {
      title:'ID',
      dataIndex:'id',
      ellipsis:true
    },
    {
      title:'时间',
      dataIndex:'time',
      ellipsis:true
    },
    {
      title:'经度',
      dataIndex:'lon',
      ellipsis:true
    },
    {
      title:'纬度',
      dataIndex:'lat',
      ellipsis:true
    }
  ]
  return (
    <Table columns={columns} dataSource={datas} />
  )
}

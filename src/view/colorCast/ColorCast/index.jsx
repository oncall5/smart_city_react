import React from 'react'
import { useState } from 'react'
import axios from '../../../api/axios'
import './style.less'
import { comm } from "../../../global/common";
import { Card, Button, Span, Table, Pagination } from 'antd'
export default function ColorCast() {
  const [isShow, setIsShow] = useState(false)
  const [showViewer, setShowViewer] = useState(false)
  const [srcList, setSrcList] = useState([])
  const [rate, setRate] = useState(0)
  const [canPlay, setCanPlay] = useState(false)
  const [play, setPlay] = useState(true)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [index, setIndex] = useState(1)
  const [tableData, setTableData] = useState([])
  const [queryInfo, setQueryInfo] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  })

  const startColorCast = () => {
    axios.$post(comm.WEB_URL + 'colorCast/python').then(res => {
      //console.log(res)
      setIsShow(false)
    })
  }
  const ffmpeg = () => {
    axios.$post(comm.WEB_URL + 'colorCast/encode').then(res => {
      setCanPlay(res.data.canPlay)
    })
  }
  const getRate = () => {
    axios.$get(comm.WEB_URL + 'colorCast/getRate').then(res => {
      // console.log(res)
      setRate(res.data.correct_rate)
      setIsShow(true)
      query()
    })
  }
  const query = async () => {
    const { content, totalElements } = await fetchTableData()
    setTableData(content)
    setQueryInfo((prevalue) => ({
      ...prevalue,
      total: totalElements
    }))
  }
  const fetchTableData = async () => {
    const { content, totalElements } = await axios.$get(
      comm.WEB_URL + 'colorCast/getColorCast',
      {
        page: queryInfo.page,
        pageSize: queryInfo.pageSize,
      }
    )
    return { content, totalElements }
  }
  const getRows = (record) => {

    // console.log(row.id)
    index = record.id
    //this.$refs.previewImg.showViewer = true;
    //console.log(this.$refs.previewImg.showViewer)
    if (srcList == undefined) {
      return srcList.push(require(`../../../assets/cast_detect/${record.id}.jpg`))
    } else {
      return srcList.splice(0, 1, require(`../../../assets/cast_detect/${record.id}.jpg`))
    }
  }
  const onPreview=()=>{
    setShowViewer(true)
  }
  const handleSizeChange = (newPageSize) => {
    setQueryInfo(queryInfo => ({
      ...queryInfo,
      pageSize: newPageSize
    }))
    query();
  }
  const handleCurrentChange = (currentPage) => {
    setQueryInfo(queryInfo => ({
      ...queryInfo,
      page: currentPage
    }))
    query();
  }
  
  const columns = [
    {
      title: '帧号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: 'a_factor',
      dataIndex: 'afactor',
      align: 'center'
    }, {
      title: 'b_factor',
      dataIndex: 'bfactor',
      align: 'center'
    }, {
      title: '偏色度',
      dataIndex: 'castDegree',
      align: 'center'
    }, {
      title: '实际偏色',
      dataIndex: 'realCast',
      align: 'center',
      // Cell:({ value }) => (
      //   <span>{value ? '是' : '否'}</span>
      // )
      render: (text, record) => {
        return (
          <span>{record.realCast ? "是" : "否"}</span>
        )
      }
    },
    {
      title: '评判结果',
      dataIndex: 'checkResult',
      align: 'center',
      // Cell:({ value }) => (
      //   <span>{value ? '是' : '否'}</span>
      // )
      render: (text, record) => {
        return (
          <span>{record.checkResult ? "是" : "否"}</span>
        )
      }
    },
    {
      title: '是否正确',
      dataIndex: 'correctFlag',
      align: 'center',
      // Cell:({ value }) => (
      //   <span>{value ? '是' : '否'}</span>
      // )
      render: (text, record) => {
        return (
          <span>{record.correctFlag ? "是" : "否"}</span>
        )
      }
    },
    {
      title: '帧图',
      align: 'center',
      fixed: "right",
      // Cell:({ value }) => (
      //   <span>{value ? '是' : '否'}</span>
      // )
      render: (text, record) => {
        return (
          <Button type='primary'
            onClick={(event) => {
              event.preventDefault();
              getRows(record);
              onPreview();
            }}
            查看
          ></Button>
        )
      }
    }
  ]
  return (
    <div>
      <Card>
        <Button type="primary" onClick={startColorCast}>偏色检测</Button>
        <Button type="primary" onClick={ffmpeg}>偏色视频播放</Button>
        <Button type="primary" onClick={getRate}>查询检测率</Button>
        {
          isShow === true && <span style={{ marginLeft: "10px" }}>检测成功率</span>
        }
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <div className='row'>
          <div className='col1'>
            <h4 style={{ textAlign: 'center' }}>偏色视频</h4>
            <video id="videoElement" src={require('../../../assets/video/movie.mp4').default} controls autoPlay muted width="700" height="500"></video>
          </div>
          <div className='col2'>
            <h4 style={{ textAlign: 'center', paddingLeft: '5vw' }}>偏色检测视频</h4>
            <video id="videoElement2" src={require('../../../assets/video/movie.mp4').default} controls autoPlay muted width="700" height="500"></video>
          </div>
        </div>

      </Card>
      {
        isShow === true && <Card style={{ marginLeft: '20px' }}>
          <Table columns={columns} dataSource={tableData} style={{ width: '100%' }}></Table>
        </Card>
      }
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

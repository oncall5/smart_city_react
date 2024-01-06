import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Button, Modal, Form, Tag, Checkbox, Input, Table, Pagination } from 'antd'
import { comm } from '../../../global/common'
import axios from '../../../api/axios'
export default function Rule3() {
  const [form1] = Form.useForm();
  const [dialogTableVisible, setDialogTableVisible] = useState(false)
  const [radio, setRadio] = useState('1')
  const [form, setForm] = useState([])
  const [count, setCount] = useState(0)
  const [numb, setNumb] = useState([])
  const [nnn, setNnn] = useState([])
  const [visible, setVisible] = useState(false)
  const [showinput1, setShowinput1] = useState(true)
  const [showinput2, setShowinput2] = useState(true)
  const [showinput3, setShowinput3] = useState(true)
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [check3, setCheck3] = useState(false)
  const [buttonshow, setButtonshow] = useState(false)
  const [formla, setFormla] = useState([])
  const [formLabelAlign, setFormLabelAlign] = useState({
    id: '',
    ssid: '',
    cdbh: '',
    fx: '',
    index: 0
  })
  const [gridData, setGridData] = useState([])
  const [tableData, setTableData] = useState([])
  const [queryInfo, setQueryInfo] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  })
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '卡口编号',
      dataIndex: 'ssid',
      align: 'center'
    },
    {
      title: '车道编号',
      dataIndex: 'cdbh',
      align: 'center'
    },
    {
      title: '方向',
      dataIndex: 'fx',
      align: 'center'
    },
  ]

  const initRaha = () => {
    axios.$get(comm.CLEAN_URL + '/initRaha').then(res => {
      console.log('初始化引擎')
      setCount(0)
      console.log(res)
      if (res.code == 0) {
        setButtonshow(true)
      }
    })
  }
  const showlabelalign = () => {
    axios.$get(comm.CLEAN_URL + '/sample').then(res => {
      if (res.code == 0) {
        setDialogTableVisible(true)
        console.log(res.data)
        console.log('data_id ' + res.data.id)
        let newformLabelAlign;
        newformLabelAlign = JSON.parse(JSON.stringify(formLabelAlign))
        newformLabelAlign.id = res.data.id
        newformLabelAlign.ssid = res.data.ssid
        newformLabelAlign.cdbh = res.data.cdbh
        newformLabelAlign.fx = res.data.fx
        newformLabelAlign.index = res.data.index
        setFormLabelAlign((prevalue) => (newformLabelAlign))
      }
      else if (res.code == 412) {
        open1()
      }
      else {
        open2()
      }
    })
  }
  const open1 = () => {
    setDialogTableVisible(false)
    setButtonshow(false)
  }
  const open2 = () => {
    setDialogTableVisible(false)
    setButtonshow(false)
  }
  const handleInput1Change = (e) => {
    setShowinput1(e.target.checked)
  }
  const handleInput2Change = (e) => {
    setShowinput2(e.target.checked)
  }
  const handleInput3Change = (e) => {
    setShowinput3(e.target.checked)
  }
  const totalonClick = () => {
    closedialog()
  }
  const closedialog = () => {
    if (count == 9) {
      dialogTableVisible = false
      buttonshow = false
    }
  }
  const getTableData = () => {
    axios.$get(comm.CLEAN_URL + 'selectByPage',
      {
        page: queryInfo.page,
        pageSize: queryInfo.pageSize,
      }).then(res => {
        console.log(res)
        setTableData(res.data.tableData)
        setQueryInfo((prevalue)=>({
          ...prevalue,
          total:res.data.total
        }))
      })
  }
  const handleSizeChange = (newPageSize) => {
    setQueryInfo(queryInfo => ({
      ...queryInfo,
      pageSize: newPageSize
    }))
    getTableData()
    changecolor()
  }
  const handleCurrentChange = (currentPage) => {
    setQueryInfo(queryInfo => ({
      ...queryInfo,
      page: currentPage
    }))
    getTableData()
    changecolor()
  }
  const changecolor = () => {
    numb.splice(0, numb.length)
    let i = queryInfo.pageSize / 10
    for (let t = 0; t < i; t++) {
      for (const p in nnn[queryInfo.page * i - i + t])
        numb.push(nnn[queryInfo.page * i - i + t][p])
    }
  }
  const changelabelalign = () => {
    check1 = false
    check2 = false
    check3 = false
    showinput1 = true
    showinput2 = true
    showinput3 = true
    setFormla(JSON.parse(JSON.stringify(formLabelAlign)))
    axios.$post(comm.CLEAN_URL + '/labelByUser', formla).then(res => {
      if (res.code == 0) {
        console.log(res.data)
        console.log('labeled ' + res.data.labeled)
        setCount(res.data.labeled)
        setNnn(res.data.labels)
        // this.$nextTick(function () {
        //   if (count < 10) {
        //     this.showlabelalign()
        //   }
        //   if (this.nnn.length != 0) {
        //     this.changecolor()
        //   }
        // })
        Promise.resolve().then(() => {
          // 在下一个事件循环周期执行的代码
          if (count < 10) {
            showlabelalign()
          }
          if (nnn.length != 0) {
            changecolor()
          }
        });
      }
      else if (res.code == 412) {
        this.open1()
      }
      else {
        this.open2()
      }
    })
  }
  useEffect(()=>{
    getTableData()
  },[])
  return (
    <div>
      <Card>
        <Button type="primary" onClick={initRaha}>初始化引擎</Button>
        {
          buttonshow && <Button type="primary" onClick={showlabelalign} ></Button>
        }
        <Modal
          open={dialogTableVisible}
          style={{ textAlign: 'center' }}
          className='data-dialog'
        >
          <div>
            <Tag style={{ marginBottom: '12px' }}>第{count + 1 <= 10 ? count + 1 : 10}条采样 (共 10 条)：请将数据错误标记出来，并修改</Tag>
          </div>
          <Form
            form={form1}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="卡口编号">
              <Checkbox onChange={handleInput1Change} checked={check1}>卡口编号</Checkbox>
              <Form.Item noStyle shouldUpdate>
                {() => (
                  <Input
                    disabled={!showinput1}
                    value={formLabelAlign.ssid}
                    onChange={(e) => setFormLabelAlign({ ...formLabelAlign, ssid: e.target.value })}
                  />
                )}
              </Form.Item>
            </Form.Item>

            <Form.Item label="车道编号">
              <Checkbox onChange={handleInput2Change}>车道编号</Checkbox>
              <Form.Item noStyle shouldUpdate>
                {() => (
                  <Input
                    disabled={!showinput2}
                    value={formLabelAlign.cdbh}
                    onChange={(e) => setFormLabelAlign({ ...formLabelAlign, cdbh: e.target.value })}
                  />
                )}
              </Form.Item>
            </Form.Item>

            <Form.Item label="方向">
              <Checkbox onChange={handleInput3Change}>方向</Checkbox>
              <Form.Item noStyle shouldUpdate>
                {() => (
                  <Input
                    disabled={!showinput3}
                    value={formLabelAlign.fx}
                    onChange={(e) => setFormLabelAlign({ ...formLabelAlign, fx: e.target.value })}
                  />
                )}
              </Form.Item>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={totalonClick}>
                提交修改
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
      <Card style={{ textAlign: 'center' }}>
        <h1>Dataset</h1>
        <Table columns={columns} dataSource={tableData}></Table>
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
      </Card>
    </div>
  )
}

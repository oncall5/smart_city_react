import React from 'react'
import { useState,useEffect } from 'react'
import { Card, Row, Col, Input, Button, Image, Modal, Pagination,Progress, Table } from 'antd'
import { comm } from "../../../global/common";
import axios from '../../../api/axios'
import { FileSearchOutlined } from '@ant-design/icons';
export default function Weibo() {
  const [pa, setPa] = useState([]);
  const [params, setParams] = useState({ name: '', n: '' });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [total, setTotal] = useState('');
  const [expire, setExpire] = useState('');
  const [color1, setColor1] = useState(null);
  const [color2, setColor2] = useState(null);
  const [width, setWidth] = useState(110);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTableVisible, setDialogTableVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [comment, setComment] = useState([]);
  const [getnumber1, setGetNumber1] = useState(0);
  const [getnumber2, setGetNumber2] = useState(0);
  const [gettime, setGetTime] = useState('');
  const [getcount, setGetCount] = useState('');
  const [fansnumber, setFansNumber] = useState('0');
  const [focusnumber, setFocusNumber] = useState('0');
  const [username, setUsername] = useState('');
  const [showuserinformation, setShowUserInformation] = useState(false);
  const [showpercent, setShowPercent] = useState(false);
  const [url, setUrl] = useState('');
  const [fansinformation, setFansInformation] = useState([]);
  const [searchusername, setSearchUsername] = useState('');
  const [searchloading, setSearchLoading] = useState(false);
  const [searchfansinfo, setSearchFansInfo] = useState({ n: 100, headers: {}, userid: 0 });
  const [fansbutton, setFansButton] = useState(true);
  const [isend, setIsEnd] = useState(false);
  const [queryInfo, setQueryInfo] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const searchUserInfo = () => {
    setSearchLoading(true)
    console.log(comm.WEIBO_URL + '/searchUserInfo/' + this.searchusername)
    axios.$post(comm.WEIBO_URL + '/searchUserInfo/' + searchusername).then(res => {
      console.log(res)
      setSearchLoading(false)
      setUsername(res.data.username)
      setFansNumber(res.data.fans)
      setFocusNumber(res.data.focus)
      setUrl(res.data.img)
      setTotal(res.data.weibo_count)
      setSearchFansInfo((prevalue) => ({
        ...prevalue,
        userid: res.data.userid,
        headers: res.data.headers
      }))
      setShowUserInformation(true)
      axios.$post(comm.WEIBO_URL + '/searchFansInfo', searchfansinfo).then(res => {
        setFansButton(false)
      })
    })
  }
  const handleFoucs = () => {
    setDialogVisible(true)
    searchfans();
  }
  const searchfans = () => {
    axios.$get(comm.WEIBO_URL + '/selectFansInfo').then(res => {
      setFansInformation(res.data)
    })
  }
  const open = () => {
    alert('搜索内容不能有空')
  }
  const open1 = () => {
    alert('获取新数据失败')
  }
  const open2 = () => {
    alert('用户全部微博数为' + this.total)
  }
  const searchweibo = () => {
    setGetNumber1(0)
    setGetNumber2(0)
    setPercentage1(0)
    setPercentage2(0)
    setColor1(null)
    setColor2(null)
    setGetTime('')
    setGetCount('')
    setDisabled(true)
    setShowPercent(true)
    setIsEnd(false)
    if (params.name === '' || params.n === '') {
      console.log("输入为空")
      open()
      setDisabled(false)
    } else {
      setLoading(true)
      setPa(JSON.parse(JSON.stringify(params)))
      axios.$post(comm.WEIBO_URL + '/searchWeiboData', pa).then(res => {

        // coded=0表示正常运行，将获取到的内容进行赋值，同时赋值操作结束后直接将进度条设置成百分百状态
        if (res.code === 0) {
          fetchTableData()
          setLoading(false)
          setGetTime(res.data.time)
          setGetCount(res.data.count + '条')
          setIsEnd(true)
        }
        // code=412时弹出消息框进行提示
        else if (res.code === 412) {
          setTotal(res.message)
          open2()
        }
        else {
          open1()
        }
        setPercentage2(percentage1)
        setColor2(color1)
        setIsEnd(true)
        setLoading(false)
        setDisabled(false)

      })
    }
  }
  const fetchTableData = () => {
    axios.$get(comm.WEIBO_URL + '/select_all',
      {
        page: queryInfo.page,
        pageSize: queryInfo.pageSize,
      }).then(res => {
        setTableData(res.data.tableData)
        setQueryInfo((prevalue) => ({
          ...prevalue,
          total: res.data.total
        }))
      })
  }
  const handleClick = (record) => {
    axios.$get(comm.WEIBO_URL + '/select_comments/' + record.id).then(res => {
      setComment(res.data)
    })
    setDialogTableVisible(true)
  }
  const columns_modal = [
    {
      title: '昵称',
      dataIndex: 'username',
      width: "150",
      align: 'center'
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: "150",
      align: 'center'
    },
    {
      title: '日期',
      dataIndex: 'created_at',
      width: "200",
      align: 'center'
    },
  ]
  const columns = [
    {
      title: '用户',
      dataIndex: 'username',
      width: '100',
      align: 'center'
    },
    {
      title: '日期',
      dataIndex: 'created_at',
      width: '150',
      align: 'center'
    },
    {
      title: '内容类型',
      dataIndex: 'content_type',
      width: '100',
      align: 'center'
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: '400',
      align: 'center'
    },
    {
      title: '转发用户名',
      dataIndex: 'retweeted_name',
      width: '100',
      align: 'center'
    },
    {
      title: '转发内容',
      dataIndex: 'retweeted_content',
      width: '300',
      align: 'center'
    },
    {
      title: '转发数',
      dataIndex: 'reposts_count',
      width: '100',
      align: 'center'
    },
    {
      title: '评论数',
      dataIndex: 'comments_count',
      width: '100',
      align: 'center'
    },
    {
      title: '点赞数',
      dataIndex: 'attitudes_count',
      width: '100',
      align: 'center'
    },
    {
      fixed: 'right',
      title: '查看评论',
      width: '400',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            <Button onClick={() => handleClick(record)} type='text' size='small'></Button>
            <Modal
              title='评论'
              open={dialogTableVisible}
              mask='false'
            >
              <Table columns={columns_modal} dataSource={comment} bordered={true} style={{ maxHeight: 500 }}>
              </Table>
            </Modal>
          </>
        )
      }
    }
  ]
  const handleSizeChange = (newPageSize)=>{
    setQueryInfo((prevalue)=>({
      ...prevalue,
      pageSize:newPageSize
    }))
    fetchTableData()
  }
  const handleCurrentChange = (page, pageSize)=>{
    setQueryInfo((prevalue)=>({
      ...prevalue,
      pageSize:pageSize,
      page:page
    }))
    fetchTableData()
  }
  useEffect(()=>{
    fetchTableData()
  },[])
  return (
    <div>
      <Card >
        <Row gutter={10} type='flex' align="middle">
          <Col span={"5"}>
            <Input
              value={searchusername}
              onChange={(value) => {
                setSearchUsername(value)
              }}
              placeholder='输入用户微博昵称,搜索用户'
              prefix={<FileSearchOutlined />}
            ></Input>
          </Col>
          <Col span={"4"}>
            <Button type="primary" icon={<FileSearchOutlined />} onClick={searchUserInfo}></Button>
          </Col>
          {
            showuserinformation && <Col span="2.5">
              <Image style={{ width: '100px', height: '100px', borderRadius: '50%' }} src='url'></Image>
            </Col>
          }
          {
            showuserinformation && <Col span="5">
              <Row>
                <span style={{ fontWeight: "bold" }}>{username}</span>
              </Row>
              <Row>
                <Button type='text' style={{ paddingRight: '20px' }} onClick={handleFoucs} disabled={fansbutton}>粉丝{fansnumber}</Button>
                <span>关注{focusnumber}</span>
              </Row>
              <Modal
                title="粉丝信息"
                open={dialogVisible}
                mask="false"
                className="fansdialog"
              >
                <div>
                  {fansinformation.map((item, idx) => (
                    <div key={idx} style={{ margin: '10px', padding: 0 }}>
                      <div style={{ padding: '3px' }}>
                        {item.fan_name && (
                          <>
                            <i className='el-icon-user-solid'></i>
                            昵称：{item.fan_name}
                          </>
                        )}
                        {item.gender === 'm' && (
                          <>
                            <i className='el-icon-male'></i>
                          </>
                        )}
                        {item.gender === 'f' && (
                          <>
                            <i className='el-icon-female'></i>
                          </>
                        )}
                      </div>
                      <div style={{ padding: '3px' }}>
                        {
                          item.description && (
                            <span>
                              <i className='el-icon-document'></i>
                              {item.description}
                            </span>
                          )
                        }
                      </div>
                      <div style={{ padding: '3px' }}>
                        <Row>
                          <Col span='12'>
                            {
                              item.birthday && (
                                <>
                                  <i class='el-icon-date'></i>
                                  {item.birthday}
                                </>
                              )
                            }
                          </Col>
                          <Col span='12'>
                            {
                              item.created_at && (
                                <>
                                  <i class='el-icon-date'></i>
                                  {item.created_at}
                                  加入微博
                                </>
                              )
                            }
                          </Col>
                        </Row>
                      </div>
                      <div style={{ padding: '3px' }}>
                        <Row>
                          <Col span='12'>
                            {
                              item.ip_location && <span>
                                <i class='el-icon-location-information'></i>
                                {item.ip_location}
                              </span>
                            }
                          </Col>
                          <Col span='12'>
                            {
                              item.location && <span>
                                <i class='el-icon-place'></i>
                                {item.location}
                              </span>
                            }
                          </Col>
                        </Row>

                      </div>
                      <div style={{ padding: '3px' }}>
                        <Row>
                          <Col span='12'>
                            {
                              item.school && <span>
                                <i class='el-icon-school'></i>
                                {item.school}
                              </span>
                            }
                          </Col>
                          <Col span='12'>
                            {
                              item.company && <span>
                                <i class='el-icon-office-building'></i>
                                {item.company}
                              </span>
                            }
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>
              <Row>
                <span>全部微博{total}</span>
              </Row>
            </Col>
          }
        </Row>
      </Card>
      <Card>
        <Row gutter='10' type='flex' align={'middle'}>
          <Col span='4.5'>
            <Input
              value={params.name}
              onChange={(e) => {
                setParams((prevalue) => ({
                  ...prevalue,
                  name: e.target.value
                }))
              }}
              placeholder='请输入用户微博昵称'
              prefix={<FileSearchOutlined />}
              mask
            ></Input>
          </Col>
          <Col span='4.5'>
            <Input value={params.n} onChange={(e) => {
              setParams((prevalue) => ({
                ...prevalue,
                name: e.target.value
              }))
            }}
              placeholder='请输入要爬取的微博数量'
              prefix={<FileSearchOutlined />}
              mask
            ></Input>
          </Col>
          <Col span={'3'}>
            <Button type='primary' onClick={searchweibo} loading={disabled}>获取新数据</Button>
          </Col>
          {
            showpercent && (<Col span='1.5'>
              <span>内容进度：</span>
            </Col>
            )
          }
          {
            showpercent && (<Col span={'2.5'}>
              <Progress type='circle' status={color1} precent={percentage1} width={width}></Progress>
            </Col>
            )
          }
          {
            showpercent && (<Col span='1.5'>
              <span>评论进度：</span>
            </Col>
            )
          }
          {
            showpercent && (<Col span={'2.5'}>
              <Progress type='circle' status={color2} precent={percentage2} width={width}></Progress>
            </Col>
            )
          }
          {
            showpercent && (<Col span={'3.5'}>
              <div>
                <span style={{ color: 'brown' }}>爬取时长：</span>
                <span style={{ color: 'brown' }}>{gettime}</span>
              </div>
              <div>
                <span style={{ color: 'brown' }}>获取到数据：</span>
                <span style={{ color: 'brown' }}>{getcount}</span>
              </div>
            </Col>
            )
          }
        </Row>
      </Card>
      <Card>
        <Table loading={loading} columns={columns} dataSource={tableData} bordered={true} style={{ width: '100%' }}></Table>
        <Row type='flex' justify={'center'}>
          <Pagination
            showQuickJumper
            defaultCurrent={queryInfo.page}
            total={queryInfo.total}
            pageSize={queryInfo.pageSize}
            onChange={handleCurrentChange}
            onShowSizeChange={handleSizeChange}
            pageSizeOptions={[10, 20, 50, 100, 200]}
            showSizeChanger="true"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          />
        </Row>
      </Card>
    </div>
  )
}

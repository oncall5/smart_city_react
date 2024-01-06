import React from 'react'
import { useEffect, useState } from 'react'
import { comm } from '../../../global/common'
import { Button, Tag, Card, Table, Space, Popconfirm ,Pagination,Modal} from 'antd'
import { setLocalStorage, getLocalStorage } from '../../../Mixin/LocalStorageMixin/LocalStorageMixin'
import { searchByRule } from '../../../Mixin/SearchMixin/SearchMixin'
import { flattenObject } from '../../../utils/tool'
import { omit } from 'lodash'
import axios from '../../../api/axios'
import AddRuleDialog from '../../../components/rule/AddRuleDialog'
export default function Rule() {
  const [tableName, setTableName] = useState('cross_road_car')
  //对queryinfo进行监视
  const [queryInfo, setQueryInfo] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { content, totalElements } = await fetchTableData();
        setTableData(content);
        setQueryInfo((prevQueryInfo) => ({
          ...prevQueryInfo,
          total: totalElements,
        }));
        search();
      } catch (error) {
        console.error(error);
        // 处理错误的逻辑
      }
    };
    fetchData();
  }, [queryInfo])
  const [tableData, setTableData] = useState([])
  const [isAddRuleDialogShow, setIsAddRuleDialogShow] = useState(false)
  //rule的监视
  const [rule, setRule] = useState([])
  useEffect(() => {
    search();
    saveRules();
  }, [rule])
  const [editingRuleIndex, setEditingRuleIndex] = useState(null)
  const [isEditRuleDialogShowleData, setIsEditRuleDialogShow] = useState(false)
  const [matchedList, setMatchedList] = useState([])
  const [supportedRule, setSupportedRule] = useState({})
  const [supportedFields, setSupportedFields] = useState([])
  const [fieldMap, setFieldMap] = useState({
    cross_road_car: {
      ssid: '卡口编号',
      cdbh: '车道编号',
      fx: '方向',
    },
  })
  //tableNames的动态绑定
  const [tableNames, setTableNames] = useState([])
  useEffect(() => {
    setTableNames(Object.keys(fieldMap))
  }, [fieldMap])
  //fields的动态绑定
  const [fields, setFields] = useState([])
  useEffect(() => {
    setFields(getFields(tableName))
  }, [tableNames])

  //ruleForRequest的动态绑定
  const [ruleForRequest, setRuleForRequest] = useState([])
  useEffect(() => {
    setRuleForRequest(rule.map((r) =>
      Object.assign(flattenObject(omit(r, ['isDirtyData'])), {
        label: !r.isDirtyData,
        tableName: tableName,
      })
    ))
  }, [rule])
  const getFields = (tableName) => {
    if (!tableNames.includes(tableName)) return []
    return Object.keys(fieldMap[tableName])
  }
  const getFieldZh=(tableName, field)=>{
    if (!(tableName in fieldMap)) return
    const tableFields = fieldMap[tableName]
    if (!(field in tableFields)) return
    return tableFields[field]
  }
  const saveRules = () => {
    setLocalStorage('dataclean__rule', rule)
  }
  const search = async () => {
    try {
      const matchedList_test = await searchByRule(
        comm.WEB_URL + '/crossroad/target_id/3.0',
        queryInfo,
        ruleForRequest,
        supportedFields
      );
      setMatchedList(matchedList_test)
    } catch (error) {
      console.error(error);
      // setState({ error: error.message });
      setMatchedList([])
    }
  };
  const fetchTableData = async () => {
    const { content, totalElements } = await axios.$get(
      comm.WEB_URL + 'crossroad/list',
      {
        page: queryInfo.page,
        pageSize: queryInfo.pageSize,
      }
    )
    return { content, totalElements }
  }
  const setAddModalOpen = ()=>{
    setIsAddRuleDialogShow(true)
  }
  const setAddModalClose = ()=>{
    setIsAddRuleDialogShow(false)
  }
  const handleAddRuleClick=(ruleForDialog) =>{
    const newrule = rule.push(ruleForDialog)
    setRule(newrule)
    setIsAddRuleDialogShow(false)
  }
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    ...fields.map((field, idx) => {
      return ({
        title: getFieldZh(tableName, field),
        dataIndex: field,
        key: idx
      })
    })
  ];
  return (
    <div>
      <Card bordered={false} >
        <Space size={[0, 8]} wrap>
          <Button type="primary" style={{ marginRight: '20px' }} onClick={setAddModalOpen}>添加规则</Button>
          <Popconfirm
            placement="top"
            title={"确定要清空规则列表吗？"}
            description={123}
            okText="Yes"
            cancelText="no"
            onConfirm={() => {
              rule = []
            }}
          >
            <Button type="primary" danger>
              清空规则
            </Button>
          </Popconfirm>
        </Space>
      </Card>
      <Card bordered={false} >
        <Table
          dataSource={tableData}
          columns={columns}
          rowKey="id"
        />
        <Pagination
        showQuickJumper
        defaultCurrent={queryInfo.pageNum}
        total={queryInfo.total}
        pageSize={queryInfo.pageSize}
        pageSizeOptions={[10, 20, 50, 100,200]}
        showSizeChanger="true"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
      </Card>
      <AddRuleDialog 
      tableName={tableName} 
      isAddRuleDialogShow={isAddRuleDialogShow}
      fields = {supportedFields} 
      setAddModalClose={setAddModalClose}
      supportedRules={supportedRule}
      rule={rule[editingRuleIndex]}
      handleAddRuleClick={handleAddRuleClick}
      getFieldZh={getFieldZh}
      ></AddRuleDialog>
    </div>
  )
}

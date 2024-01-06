import React from 'react'
import RegexInput from '../RegexInput'
import MinMaxInput from '../MinMaxInput'
import { useState, useEffect } from 'react'
import { Modal, Form, Select, Switch } from 'antd'
import { prettyDOM } from '@testing-library/react';
const { Option } = Select;
export default function AddRuleDialog(props) {
  console.log('props_add', props)
  const { tableName, isAddRuleDialogShow, setAddModalClose, fields, supportedRules, handleAddRuleClick, getFieldZh } = props
  const [rule, setRule] = useState({
    isDirtyData: true,
    field: null,
    regex: '',
    val: {
      minValue: null,
      includeMin: false,
      maxValue: null,
      includeMax: false,
    },
  })
  const [supportedRule, setSupportedRule] = useState([])
  const [isRuleAddable, setIsRuleAddable] = useState(null)
  useEffect(() => {
    setIsRuleAddable((
      rule?.regex !== '' ||
      (rule?.val.minValue !== null && rule?.val.minValue !== '') ||
      (rule?.val.maxValue !== null && rule?.val.maxValue !== '')
    ))
  }, [rule])

  const onFinish = (values) => {
    console.log(values);
  };
  const handleFieldSelectorChange = async (value) => {
    setRule((prevRule) => ({
      ...prevRule,
      field: value
    }))
    setSupportedRule((prev) => (supportedRules[rule.field]))
    // supportedRule = supportedRules[rule.field]
  }
  const handleFieldSwitchChange = async (checked, event) => {
    setRule((prevRule) => ({
      ...prevRule,
      isDirtyData: checked
    }))
  }
  return (
    <Modal
      footer={null}
      title="添加规则"
      open={props.isAddRuleDialogShow}
      onCancel={props.setAddModalClose}
    >
      <Form onFinish={onFinish} >
        <Form.Item label="字段" hasFeedback validateStatus='success' labelCol={{ span: 0 }} style={{ width: "60%" }}>
          <Select
            placeholder="请选择字段"
            value={rule.field}
            onChange={handleFieldSelectorChange}
          >
            {fields.map((f, idx) => (
              <Option key={idx} value={f}>
                {getFieldZh(tableName, f)}
              </Option>
            ))}
          </Select>

        </Form.Item>
        <Form.Item>
          <Switch
            checkedChildren="干净数据"
            unCheckedChildren="脏数据"
            onChange={handleFieldSwitchChange}
          />
        </Form.Item>
        <>
          {
            rule.filed && supportedRule.map((r, idx) => {
              return (
                <React.Fragment key={idx}>
                  {
                    r.rule_type === 'regex' && (
                      <RegexInput
                        value={rule.regex}
                        onChange={(value) => setRule(prevRule => ({ ...prevRule, regex: value }))}
                        bindingPropName="regex"
                      >
                      </RegexInput>
                    )
                  }
                  {r.rule_type === 'min_max' && (
                    <MinMaxInput
                      value={rule.val}
                      onChange={(value) => setRule(prevRule => ({ ...prevRule, val: value }))}
                    />
                  )}
                </React.Fragment>
              )
            })
          }
        </>
      </Form>
    </Modal>
  )
}

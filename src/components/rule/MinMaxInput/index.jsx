import React from 'react'
import { Form, Input, Checkbox } from 'antd'
export default function MinMaxInput(props) {
  const { val } = props
  MinMaxInput.defaultProps = {
    val: {
      minValue: '',
      maxValue: '',
      includeMin: false,
      includeMax: false,
    }
  }
  return (
    <>
      <Form.Item
        label="最小值"
        value={val.minValue}
      >
        <Input
          type="number"
          value={val.minValue}
        ></Input>
      </Form.Item>
      <Form.Item
        value={val.includeMin}
      >
        <Checkbox value={val.includeMin} >包含边界</Checkbox>;
      </Form.Item>
      <Form.Item label="最大值" value={val.maxValue}>
        <Input type="number" value={val.maxValue}></Input>
      </Form.Item>
      <Form.Item
        value={val.includeMax}
      >
        <Checkbox value={val.includeMax} >包含边界</Checkbox>;
      </Form.Item>
    </>
  )
}

import React from 'react'
import {Form} from 'antd'
export default function RegexInput(props) {
    const {bindingPropName,value} = props
    return (
    <div>
            <Form.Item
            label="匹配规则"
            value={bindingPropName}
            >
                <input value={value} ></input>
            </Form.Item>
    </div>
  )
}

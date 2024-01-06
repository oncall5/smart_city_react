import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import './style.less'
import axios from "axios";
import myImage from '../../assets/1.png'
export default function Login() {
    const containerStyle = {
        backgroundImage: `url(${myImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    const onFinish = (values) => {
        console.log('success:', values);
        history.push('/')
        axios.get('http://10.11.24.169:8181/dataclean/login',{params:{username:loginForm.username,password:loginForm.password}}).then(res => {
        console.log(res)
        if(res.data==="登录成功") {
            alert('success')
        }
        else{
          this.$message.error("用户名或密码错误");
        //this.flightstarget=res
        }
      });
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    const history = useHistory();
    
    const [loginForm,setLoginForm] = React.useState({
        username: 'admin',
        password: '123456'
      })
    
    return (
        <div className="login_container">
            <div className="background" style={containerStyle}>
                <div className="login_box">
                    <div className="avatar_box">
                        <img src={"https://img95.699pic.com/photo/40250/3647.jpg_wh300.jpg"} alt="" />
                    </div >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className='login_from'
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                { required: true, message: '请输入登录名称', trigger: 'blur' }
                            ]}
                            initialValue={loginForm.username}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: '请输入登录密码', trigger: 'blur' }
                            ]}
                            initialValue={loginForm.password}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" className='btns' >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div >
            </div >
        </div>
    )
}

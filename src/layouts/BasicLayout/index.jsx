import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './style.less'
import MainHeader from '../MainHeader';

export default function index({ route, children }) {
  const { Header, Content, Footer } = Layout;
  console.log("b", route, children)
  return (
    <Layout className='home-container'>
      <MainHeader routes={route.childRoutes} className='el-header' />
      <Layout.Content className='main-section'>
        {children}
      </Layout.Content>
    </Layout>
  )
}

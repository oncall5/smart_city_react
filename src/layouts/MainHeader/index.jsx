import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { RocketTwoTone } from '@ant-design/icons';
import './style.less'
export default function index({ routes }) {
    const { Header, Content, Footer } = Layout;
    const renderMenuItem = (target) =>
        target
            .filter((item) => item.path && item.name)
            .map((subMenu) => {
                //这里分为俩类，一种是有path和name这俩个子项，同时含有子菜单，一种是有path和name，但是没有子菜单，那就会只渲染还成为一个普通的菜单项
                if (subMenu.childRoutes && !!subMenu.childRoutes.find((child) => child.path && child.name)) {
                    return (
                        <Menu.SubMenu
                            key={subMenu.path}
                            title={
                                <div>
                                    {!!subMenu.icon && subMenu.icon}
                                    <span>{subMenu.name}</span>
                                </div>
                            }
                        >
                            {renderMenuItem(subMenu.childRoutes)}
                        </Menu.SubMenu>
                    );
                }
                return (
                    <Menu.Item key={subMenu.path}>
                        <Link to={subMenu.path}>
                            <span>
                                {!!subMenu.icon && subMenu.icon}
                                <span>{subMenu.name}</span>
                            </span>
                        </Link>
                    </Menu.Item>
                );
            });

    return (
        <Layout>
            <span className="introduct">国家重点研发计划项目:面向城市公共服务的高效融合与动态认知技术和平台(2019YFB2102100)</span>
            <span className="introduct">课题一:多源多模数据实时采集与协同感知演示系统</span>
            <Menu
                mode="horizontal"
                theme="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                style={{ paddingLeft: 0, marginBottom: 0 }}
                className="el-menu-demo"
            >
                {renderMenuItem(routes)}
            </Menu>
        </Layout>
    )
}

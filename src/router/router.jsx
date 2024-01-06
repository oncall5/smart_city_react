// import {Navigate} from 'react-router-dom'
import React, { lazy } from 'react';
import BlankLayout from '../layouts/BlankLayout'
import BasicLayout from '../layouts/BasicLayout'
const routes = [
    {
        path: '/',
        component: BlankLayout,
        childRoutes: [
            {
                path: '/login',
                name: '登录',
                component: lazy(() => import('../view/Login'))
            },
            {
                path: '/',
                component: BasicLayout,
                childRoutes: [
                    {
                        path: '/introduce',
                        name: '系统介绍',
                        component: lazy(() => import('../view/Home')),
                    },
                    {
                        path: '/dataclean/citybrain',
                        name: '城市大脑数据',
                        childRoutes: [
                            {
                                path: '/dataclean/citybrain/traffic',
                                name: '智慧交通系统',
                                childRoutes: [
                                    {
                                        path: '/dataclean/citybrain/traffic/mobileGps',
                                        name: '行人位置获取',
                                        component: lazy(() => import('../view/citybrain/traffic/MobileGps')),
                                    },
                                    {
                                        path: '/dataclean/citybrain/traffic/queryFilghtsData',
                                        name: "GPS与道路转换",
                                        component: lazy(() => import('../view/citybrain/traffic/Flights')),
                                    },
                                    {
                                        path: '/dataclean/citybrain/traffic/trajectory_interpolation',
                                        name: "轨迹数据修复",
                                        component: lazy(() => import('../view/citybrain/traffic/Trajectory_interpolation')),
                                    },
                                    {
                                        path: '/dataclean/citybrain/traffic/trajectory_detection',
                                        name: "轨迹数据异常检测",
                                        component: lazy(() => import('../view/citybrain/traffic/Trajectory_detection')),
                                    },
                                    {
                                        path: '/dataclean/citybrain/traffic/licensePlate',
                                        name: "汽车车牌转换",
                                        component: lazy(() => import('../view/citybrain/traffic/LicensePlate')),
                                    },
                                    {
                                        path:'/dataclean/citybrain/traffic/trajectoryDetail',
                                        name:"轨迹详情",
                                        component: lazy(() => import('../view/citybrain/traffic/TrajectoryDetail')),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: '/dataclean/sensor',
                        name: '传感器',
                        childRoutes: [
                            {
                                path: '/dataclean/sensor/ZhijiangAll',
                                name: '之江传感器',
                                component: lazy(() => import('../view/sensor/ZhijiangAll')),
                            },
                            {
                                path: '/dataclean/sensor/Summary_index',
                                name: '指标汇总',
                                component: lazy(() => import('../view/sensor/Summary_index')),
                            },
                        ]
                    },
                    {
                        path: '/dataclean/camera',
                        name: '摄像头',
                        childRoutes: [
                            {
                                path: '/dataclean/camera/ten_floor',
                                name: '十号楼',
                                childRoutes: [
                                    {
                                        path: '/dataclean/camera/ten_floor/eastexitcamera',
                                        name: '东大门出口',
                                        component: lazy(() => import('../view/camera/Eastexitcamera')),
                                    },
                                    {
                                        path: '/dataclean/camera/ten_floor/northcamera',
                                        name: '北出口摄像头',
                                        component: lazy(() => import('../view/camera/Northcamera')),
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: '/dataclean/rule',
                        name: '规则引擎',
                        childRoutes:[
                            {
                                path: '/dataclean/rule/rule',
                                name: '自定义规则引擎',
                                component: lazy(() => import('../view/rule/Rule')),
                            },
                            {
                                path: '/dataclean/rule/rule3',
                                name: '智能规则引擎',
                                component: lazy(() => import('../view/rule/Rule3')),
                            },
                        ]
                    },
                    {
                        path: '/dataclean/colorCast',
                        name:'偏色检测',
                        component:lazy(() => import('../view/colorCast/ColorCast'))
                    },
                    {
                        path: '/dataclean/weibo',
                        name:'社群数据',
                        component:lazy(() => import('../view/weibo/Weibo'))
                    },
                    { path: '/', exact: true, redirect: '/introduce' }
                ]
            }

        ]
    },

]
export default routes
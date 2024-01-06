import React, { useState } from 'react'
import myImage from '../../assets/1.png'
import { Dropdown, Button, Space } from 'antd'
import { DownOutlined, SmileOutlined, } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './style.less'

export default function Home() {
  const items_camera = [
    {
      key: '1',
      label: (
        '餐厅通道'
      ),
      onClick: (history) => {
        history.push('/dataclean/camera/ten_floor/eastexitcamera')
      }
    },
    {
      key: '2',
      label: (
        '摄像头'
      ),
      onClick: (history) => {
        history.push('/dataclean/camera/ten_floor/northcamera')
      },
    }

  ];
  const items_csdn = [
    {
      key: '1',
      label: (
        '轨迹数据修复'
      ),
      onClick: (history) => {
        history.push('/dataclean/citybrain/traffic/trajectory_interpolation')
      }
    },
    {
      key: '2',
      label: (
        '轨迹数据异常检测'
      ),
      onClick: (history) => {
        history.push('/dataclean/citybrain/traffic/trajectory_detection')
      }
    },
    {
      key: '3',
      label: (
        '汽车车牌转换'
      ),
      onClick: (history) => {
        history.push('/dataclean/citybrain/traffic/licensePlate')
      }
    }
  ];
  const items_cgq = [
    {
      key: '1',
      label: (
        '之江传感器'
      ),
      onClick: (history) => {
        history.push('/dataclean/sensor/ZhijiangAll')
      }
    },
    {
      key: '2',
      label: (
        '指标汇总'
      ),
      onClick: (history) => {
        history.push('/dataclean/sensor/Summary_index')
      }
    }
  ];
  const items_gzyq = [
    {
      key: '1',
      label: (
        '自定义规则引擎'
      ),
      onClick: (history) => {
        history.push('/dataclean/rule/rule')
      }
    },
    {
      key: '2',
      label: (
        '智能规则引擎'
      ),
      onClick: (history) => {
        history.push('/dataclean/rule/rule3')
      }
    }
  ];
  const items_psjc = [
    {
      key: '1',
      label: (
        '偏色检测'
      ),
      onClick: (history) => {
        history.push('/dataclean/colorCast')
      }
    }

  ];
  const items_sqsj = [
    {
      key: '1',
      label: (
        '社群数据'
      ),
      onClick: (history) => {
        history.push('/dataclean/weibo')
      }
    }

  ];
  const history = useHistory();
  const containerStyle = {
    backgroundImage: `url(${myImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const handleItemClick = (onClick) => {
    onClick(history);
  };
  return (
    <div className="app-container" style={containerStyle}>
      <div className='sxt1'>
        <Dropdown
          menu={{
            items: items_camera.map((item) => ({
              ...item,
              onClick: () => handleItemClick(item.onClick),
            })),
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space direction='vertical'>
              摄像头
              <img src={require('../../assets/04.jpeg').default} style={{ height: '50px' }} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className='csdn' >
        <Dropdown
          menu={{
            items: items_csdn.map((item) => ({
              ...item,
              onClick: () => handleItemClick(item.onClick),
            })),
          }}
          autoAdjustOverflow
          autoFocus="true"
          placement="top"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space direction='vertical'>
              城市大脑数据
              <img src={require('../../assets/0.jpeg').default} style={{ height: '50px' }} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className='cgq' >
        <Dropdown
          menu={{
            items: items_cgq.map((item) => ({
              ...item,
              onClick: () => handleItemClick(item.onClick),
            })),
          }}
          autoAdjustOverflow
          autoFocus="true"
          placement="bottom"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space direction='vertical'>
              传感器
              <img src={require('../../assets/3.jpeg').default} style={{ height: '50px' }} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className='gzyq' >
        <Dropdown
          menu={{
            items: items_gzyq.map((item) => ({
              ...item,
              onClick: () => handleItemClick(item.onClick),
            })),
          }}
          autoAdjustOverflow
          autoFocus="true"
          placement="bottom"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space direction='vertical'>
              规则引擎
              <img src={require('../../assets/05.jpeg').default} style={{ height: '50px' }} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className='psjc' >
        <Dropdown
          menu={{
            items: items_psjc.map((item) => ({
              ...item,
              onClick: () => handleItemClick(item.onClick),
            })),
          }}
          autoAdjustOverflow
          autoFocus="true"
          placement="bottom"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space direction='vertical'>
              偏色检测
              <img src={require('../../assets/06.jpeg').default} style={{ height: '50px' }} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className='sqsj' >
        <Dropdown
          menu={{
            items: items_sqsj.map((item) => ({
              ...item,
              onClick: () => handleItemClick(item.onClick),
            })),
          }}
          autoAdjustOverflow
          autoFocus="true"
          placement="bottom"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space direction='vertical'>
              社群数据
              <img src={require('../../assets/07.jpeg').default} style={{ height: '50px' }} />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

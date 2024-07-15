"use client"
import React from 'react';
import { UserAddOutlined, LoginOutlined, GiftOutlined, DollarOutlined, LineChartOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'login',
    label: 'Login',
    icon: <LoginOutlined />,
  },
  {
    key: 'signup',
    label: 'Register',
    icon: <UserAddOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: 'developer/newCampaign',
    label: 'New Campaign',
    icon: <AppstoreAddOutlined />,
  },
  {
    key: 'developer/campaigns',
    label: 'Campaigns',
    icon: <GiftOutlined />,
  },
  {
    key: 'developer/balance',
    label: '0.03 T',
    icon: <DollarOutlined />,
  },
  {
    key: 'developer/monitering',
    label: 'Monitering',
    icon: <LineChartOutlined />,
  },
];

const NavBar: React.FC = () => {
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    router.push('/' + e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ 
        width: 256,
        backgroundColor: "#f0f4f8"
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default NavBar;
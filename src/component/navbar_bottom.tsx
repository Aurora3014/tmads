"use client"
import React from 'react';
import { BookOutlined, LogoutOutlined, LinkOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'support',
    label: 'Support',
    icon: <LinkOutlined />,
  },
  {
    key: 'documentation',
    label: 'Document',
    icon: <BookOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    label: 'User Name',
    icon: <LogoutOutlined />,
  }
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
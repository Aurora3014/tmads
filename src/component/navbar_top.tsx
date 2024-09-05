"use client"
import React, { useEffect, useState } from 'react';
import { UserAddOutlined, LoginOutlined, GiftOutlined, DollarOutlined, LineChartOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { useCookies } from '../provider/CookieProvider';
import Cookies from 'js-cookie'

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'campaigns',
    label: 'Campaigns',
    icon: <GiftOutlined />,
  },
  {
    key: 'balance',
    label: '0.03 T',
    icon: <DollarOutlined />,
  },
  {
    key: 'monitering',
    label: 'Monitering',
    icon: <LineChartOutlined />,
  },
];

const NavBar: React.FC = () => {
  const router = useRouter();
  const { auth } = useCookies();
  const onClick: MenuProps['onClick'] = (e) => {
    router.push('/' + Cookies.get('mode') + '/' + e.key);
  };

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      { auth && isClient ? 
        <Menu
          onClick={onClick}
          style={{ 
            width: 256,
            backgroundColor: "#f0f4f8",
            border: 'none'
        
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        /> : <></>
      }
    </>
  );
};

export default NavBar;
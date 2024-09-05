"use client"
import React, { useEffect, useState } from 'react';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { useCookies } from '../provider/CookieProvider';

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
  }
];

const NavBar: React.FC = () => {
  const router = useRouter();
  const { auth } = useCookies();
  const onClick: MenuProps['onClick'] = (e) => {
    router.push('/' + e.key);
  };
  
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      { !auth && isClient ? 
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
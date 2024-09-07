"use client"
import React, { useEffect, useState } from 'react';
import { BookOutlined, LogoutOutlined, LinkOutlined, SwapOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { redirect, useRouter } from 'next/navigation';

import { useCookies } from '@/provider/CookieProvider';
import { externalUrl } from '@/constant';
import { logout } from '@/lib/auth';
import Cookies from 'js-cookie';
type MenuItem = Required<MenuProps>['items'][number];

const NavBar: React.FC = () => {
  const router = useRouter();
  const { auth } = useCookies();
  const email = Cookies.get('email')
  const onClick: MenuProps['onClick'] = (e) => {
    if(e.key == 'logout'){
      logout();
      Cookies.remove('user')
      router.push(`/${Cookies.get('mode')}/login`);
    } else if(auth)
      window.location.href = externalUrl[e.key as keyof typeof externalUrl];
  };

  const items: MenuItem[] = [
    // {
    //   key: 'switch',
    //   label: 'Switch Account',
    //   icon: <SwapOutlined />,
    // },
    {
      key: 'support',
      label: 'Support',
      icon: <LinkOutlined />,
    },
    {
      key: 'document',
      label: 'Document',
      icon: <BookOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: email,
      icon: <LogoutOutlined />,
    }
  ];

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if(!auth){ 
      router.push(`/${Cookies.get('mode')}/login`)
      Cookies.remove('user')
    }
  }, [])

  return (
    <>
      { auth && isClient ? 
        <Menu
          onClick={onClick}
          style={{ 
            width: 256,
            backgroundColor: "#f0f4f8",
            position: 'fixed',
            bottom: 0,
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
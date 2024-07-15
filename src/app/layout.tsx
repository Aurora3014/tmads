/* eslint-disable jsx-a11y/alt-text */
'use client';

import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { usePathname } from 'next/navigation';
import NavBarTop from '@/component/navbar_left';
import NavBarBottom from '@/component/navbar_bottom';
import React from 'react';
import Image from 'next/image'
import favicon from '@/image/favicon.png'
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const showNavbar = pathname !== '/';

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <div className='flex flex-row h-screen'>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex flex-row border-r">
                  <Image
                    src={favicon}
                    width={30}
                    height={30}
                    className='m-4'
                    alt="favicon"
                  />
                  <p className='flex flex-col justify-center text-xl font-bold'>TMAds Games</p>
                </div>
                {showNavbar && <NavBarTop />}
              </div>
              {showNavbar && <NavBarBottom />}
            </div>
            <main className='w-full h-screen'>{children}</main>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default Layout;

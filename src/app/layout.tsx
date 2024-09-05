/* eslint-disable jsx-a11y/alt-text */
'use client';

import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { usePathname } from 'next/navigation';
import NavBarTop from '@/component/navbar_top';
import NavBarLanding from '@/component/navbar_landing';
import NavBarBottom from '@/component/navbar_bottom';
import React from 'react';
import Image from 'next/image'
import favicon from '@/image/favicon.png'
import { CookieProvider } from '../provider/CookieProvider';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const showNavbar = pathname !== '/' && !pathname.includes('/adcard');

  return (
    <html lang="en">
      <CookieProvider>
        <body>
          <AntdRegistry>
            { showNavbar ?
            <div className='flex flex-row h-screen relative'>
              <div className="flex flex-col justify-between fixed">
                <div>
                  <div className="flex flex-row">
                    <Image
                      src={favicon}
                      width={30}
                      height={30}
                      className='m-4'
                      alt="favicon"
                    />
                    <p className='flex flex-col justify-center text-xl font-bold'>TMAds Games</p>
                  </div>
                  <NavBarLanding />
                  <NavBarTop />
                </div>
                <div className='h-full '></div>
                <NavBarBottom />
              </div>
              <main className='w-full h-screen ml-64 justify-center border-l'>
                {children}
              </main>
            </div>
            : children
            }
          </AntdRegistry>
        </body>
      </CookieProvider>
    </html>
  );
};

export default Layout;

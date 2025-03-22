import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const Navbar = () => {
  const location = useLocation();
  const { isConnected } = useAccount();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/my-pets', label: '我的宠物', requiresAuth: true },
    { path: '/marketplace', label: '市场' },
    { path: '/battle-arena', label: '竞技场', requiresAuth: true },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">PixPet</span>
              <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">
                BETA
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // 如果需要认证且用户未连接钱包，则不显示此项
              if (item.requiresAuth && !isConnected) return null;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium hover:text-yellow-300 transition-colors ${location.pathname === item.path ? 'text-yellow-300' : ''
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 

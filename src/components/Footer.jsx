import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">PixPet</h2>
            <p className="text-gray-400 max-w-xs">
              区块链上的像素宠物养成游戏，让你创建、培养和战斗自己的NFT宠物。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">链接</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">首页</Link></li>
                <li><Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">市场</Link></li>
                <li><Link to="/my-pets" className="text-gray-400 hover:text-white transition-colors">我的宠物</Link></li>
                <li><Link to="/battle-arena" className="text-gray-400 hover:text-white transition-colors">战斗竞技场</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">资源</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">文档</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">白皮书</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">帮助中心</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-3">联系我们</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Telegram</a></li>
                <li><a href="mailto:support@pixpet.io" className="text-gray-400 hover:text-white transition-colors">support@pixpet.io</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} PixPet. 保留所有权利。
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              服务条款
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              合约地址
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 

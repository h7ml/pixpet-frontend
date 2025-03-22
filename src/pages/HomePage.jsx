import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

const HomePage = () => {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center">
      {/* 英雄区域 */}
      <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">欢迎来到 PixPet 世界</h1>
        <p className="text-xl md:text-2xl mb-8">创建、培养和战斗你的像素宠物</p>

        {isConnected ? (
          <Link
            to="/my-pets"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            进入游戏
          </Link>
        ) : (
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            连接钱包开始
          </button>
        )}
      </div>

      {/* 功能特点 */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🎨</span>
            </div>
            <h3 className="text-xl font-bold mb-2">AI 宠物生成</h3>
            <p className="text-gray-600">使用先进的 AI 技术生成独特的像素风格宠物</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">⛓️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">链上养成</h3>
            <p className="text-gray-600">在区块链上培养和发展你的宠物属性与技能</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-20 h-20 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">⚔️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">社交战斗</h3>
            <p className="text-gray-600">与其他玩家的宠物进行互动、交易和战斗</p>
          </div>
        </div>
      </div>

      {/* 如何开始 */}
      <div className="w-full bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">如何开始</h2>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">连接钱包</h3>
              <p className="text-gray-600">使用 MetaMask、Argent 等多种钱包连接</p>
            </div>

            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">铸造宠物</h3>
              <p className="text-gray-600">创建你的第一个 PixPet 宠物</p>
            </div>

            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">开始冒险</h3>
              <p className="text-gray-600">培养宠物并参与社区活动</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 

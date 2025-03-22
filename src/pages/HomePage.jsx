import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const HomePage = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">欢迎来到 PixPet 世界</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            创建、培养和战斗你的像素宠物，在区块链上开启一段奇妙的冒险！
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {isConnected ? (
              <Link
                to="/marketplace"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg transition-colors inline-block"
              >
                开始探索
              </Link>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg transition-colors"
                  >
                    连接钱包开始
                  </button>
                )}
              </ConnectButton.Custom>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">游戏特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">独特玩法</h3>
              <p className="text-gray-600">结合传统养成游戏与区块链技术，打造独特的游戏体验</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">NFT 资产</h3>
              <p className="text-gray-600">每个像素宠物都是独一无二的 NFT，真正属于你的数字资产</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">竞技对战</h3>
              <p className="text-gray-600">参与刺激的宠物对战，赢取奖励，提升排名</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

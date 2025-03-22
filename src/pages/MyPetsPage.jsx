import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faWallet, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const MyPetsPage = () => {
  const { isConnected, address } = useAccount();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        // 模拟从区块链获取数据的延迟
        // TODO: 替换为实际的合约调用
        const response = await fetch('/api/my-pets');
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('获取宠物列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) {
      fetchPets();
    } else {
      setLoading(false);
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faPaw} className="text-purple-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2">查看您的宠物</h2>
            <p className="text-gray-600 mb-6">连接您的钱包以访问您的像素宠物收藏</p>
          </div>

          <div className="space-y-4">
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <FontAwesomeIcon icon={faWallet} className="text-lg" />
                  <span>连接钱包</span>
                </button>
              )}
            </ConnectButton.Custom>

            <Link
              to="/marketplace"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <span>浏览市场</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>支持 MetaMask、Argent 等主流钱包</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-600">加载您的宠物中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">我的宠物</h1>
          <p className="text-gray-600">
            钱包地址: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
        <Link
          to="/marketplace"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <span>获取新宠物</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faPaw} className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-2">还没有宠物</h3>
          <p className="text-gray-600 mb-6">在市场中挑选您的第一个像素宠物开始冒险吧！</p>
          <Link
            to="/marketplace"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center space-x-2 transition-colors"
          >
            <span>前往市场</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{pet.name}</h2>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Lv. {pet.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">种族: {pet.species}</p>
                <div className="mb-3">
                  {pet.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>经验值</span>
                    <span>{pet.experience}/200</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(pet.experience / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/pet/${pet.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    详情
                  </Link>
                  <Link
                    to={`/battle-arena?pet=${pet.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    战斗
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPetsPage;

import React, { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';
// 使用更好看的NFT图片集合
const nftImages = {
  Dragon: [
    'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=400&fit=crop',
  ],
  Cat: [
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=400&fit=crop',
  ],
  Monster: [
    'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554110397-9cea6277a913?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559628129-9f226fb2b7c4?w=400&h=400&fit=crop',
  ],
};

const MarketplacePage = () => {
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const [nfts, setNfts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // 获取NFT列表
  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/marketplace/nfts');
        setNfts(response.data.data);
      } catch (error) {
        console.error('获取NFT列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  // 处理购买
  const handleBuy = async (nft) => {
    if (!isConnected) {
      alert('请先连接钱包');
      return;
    }

    try {
      // 这里应该调用智能合约进行购买
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟交易延迟
      alert(`购买成功！您已获得 ${nft.name}`);
    } catch (error) {
      console.error('购买失败:', error);
      alert('购买失败，请重试');
    }
  };

  // 处理搜索
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // 筛选NFTs
  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">NFT 市场</h1>
        <div className="flex items-center space-x-4">
          {/* 钱包余额显示 */}
          {isConnected && balance && (
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
                  alt="ETH"
                  className="w-4 h-4 mr-2"
                />
                <span className="font-medium">{parseFloat(balance?.formatted).toFixed(4)} ETH</span>
              </div>
            </div>
          )}
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="搜索宠物..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {/* 筛选按钮 */}
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            筛选
          </button>
        </div>
      </div>

      {!isConnected && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-yellow-800 mb-4 sm:mb-0">连接钱包以开始交易您的像素宠物 NFT</p>
            <ConnectButton />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <div
              key={nft.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square">
                <img
                  src={nftImages[nft.type][Math.floor(Math.random() * nftImages[nft.type].length)]}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      nft.rarity === '传说'
                        ? 'bg-yellow-400 text-yellow-900'
                        : nft.rarity === '史诗'
                          ? 'bg-purple-400 text-purple-900'
                          : nft.rarity === '稀有'
                            ? 'bg-blue-400 text-blue-900'
                            : 'bg-gray-400 text-gray-900'
                    }`}
                  >
                    {nft.rarity}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{nft.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">等级 {nft.level}</span>
                  <span className="text-sm font-medium text-purple-600">{nft.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
                      alt="ETH"
                      className="w-4 h-4 mr-1"
                    />
                    <span className="font-bold">{nft.price} ETH</span>
                  </div>
                  <button
                    onClick={() => handleBuy(nft)}
                    disabled={!isConnected}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isConnected
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isConnected ? '购买' : '请先连接钱包'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;

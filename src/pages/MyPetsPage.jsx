import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';

// 假数据，实际应从合约获取
const dummyPets = [
  {
    id: 1,
    name: '像素龙',
    image: 'https://placehold.co/300x300?text=PixelDragon',
    level: 5,
    species: 'Dragon',
    traits: ['Fire', 'Brave'],
    experience: 120,
  },
  {
    id: 2,
    name: '电子猫',
    image: 'https://placehold.co/300x300?text=CyberCat',
    level: 3,
    species: 'Cat',
    traits: ['Electric', 'Timid'],
    experience: 75,
  },
];

const MyPetsPage = () => {
  const { isConnected, address } = useAccount();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      // 模拟从区块链获取数据的延迟
      setTimeout(() => {
        // 实际项目中，这里应该调用合约获取用户的宠物
        setPets(dummyPets);
        setLoading(false);
      }, 1000);
    };

    if (isConnected) {
      fetchPets();
    } else {
      setLoading(false);
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8 w-full max-w-lg">
          <p className="text-yellow-700">请连接钱包以查看您的宠物</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">
          连接钱包
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">我的宠物</h1>
        <Link
          to="/marketplace"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full"
        >
          获取新宠物
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">您还没有宠物</p>
          <Link
            to="/marketplace"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full"
          >
            获取您的第一个宠物
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{pet.name}</h2>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Lv. {pet.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">Species: {pet.species}</p>
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
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(pet.experience / 200) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/pet/${pet.id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1 px-3 rounded"
                  >
                    详情
                  </Link>
                  <Link
                    to={`/battle-arena?pet=${pet.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded"
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

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useLocation } from 'react-router-dom';

// 模拟对手数据
const opponentsList = [
  {
    id: 101,
    name: '火焰兽',
    image: 'https://placehold.co/300x300?text=FireMonster',
    level: 3,
    species: 'Monster',
    abilities: ['Fire Breath', 'Tough Skin'],
    owner: '0x123...789',
    winRate: '62%',
  },
  {
    id: 102,
    name: '雷霆猫',
    image: 'https://placehold.co/300x300?text=ThunderCat',
    level: 4,
    species: 'Cat',
    abilities: ['Lightning Strike', 'Quick Attack'],
    owner: '0x456...abc',
    winRate: '58%',
  },
  {
    id: 103,
    name: '冰霜龙',
    image: 'https://placehold.co/300x300?text=IceDragon',
    level: 5,
    species: 'Dragon',
    abilities: ['Ice Blast', 'Frost Shield'],
    owner: '0x789...def',
    winRate: '70%',
  },
];

// 模拟用户宠物数据
const myPets = [
  {
    id: 1,
    name: '像素龙',
    image: 'https://placehold.co/300x300?text=PixelDragon',
    level: 5,
    species: 'Dragon',
    abilities: ['Fire', 'Brave'],
    experience: 120,
  },
  {
    id: 2,
    name: '电子猫',
    image: 'https://placehold.co/300x300?text=CyberCat',
    level: 3,
    species: 'Cat',
    abilities: ['Electric', 'Timid'],
    experience: 75,
  },
];

const BattleArenaPage = () => {
  const { isConnected } = useAccount();
  const location = useLocation();
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [battleState, setBattleState] = useState('selection'); // selection, preparing, battling, result
  const [battleResult, setBattleResult] = useState(null);
  const [battleLog, setBattleLog] = useState([]);

  // 从URL参数中获取预选宠物
  useEffect(() => {
    if (isConnected) {
      const params = new URLSearchParams(location.search);
      const petId = params.get('pet');

      if (petId) {
        const pet = myPets.find((p) => p.id === parseInt(petId, 10));
        if (pet) {
          setSelectedPet(pet);
        }
      }
    }
  }, [isConnected, location.search]);

  // 选择宠物
  const selectPet = (pet) => {
    setSelectedPet(pet);
    setBattleState('selection');
    setBattleResult(null);
    setBattleLog([]);
  };

  // 选择对手
  const selectOpponent = (opponent) => {
    setSelectedOpponent(opponent);
  };

  // 开始战斗准备
  const startBattlePreparation = () => {
    if (!selectedPet || !selectedOpponent) return;

    setBattleState('preparing');
    setBattleLog([`${selectedPet.name} 准备与 ${selectedOpponent.name} 战斗...`]);

    // 模拟准备过程
    setTimeout(() => {
      setBattleState('battling');
      simulateBattle();
    }, 2000);
  };

  // 模拟战斗过程
  const simulateBattle = () => {
    const logs = [
      `战斗开始！${selectedPet.name} VS ${selectedOpponent.name}`,
      `${selectedPet.name} 使用了 ${selectedPet.abilities[0]}！`,
    ];

    setBattleLog(logs);

    // 继续模拟战斗过程
    setTimeout(() => {
      const newLog = `${selectedOpponent.name} 使用了 ${selectedOpponent.abilities[0]}！`;
      setBattleLog((prev) => [...prev, newLog]);
    }, 1500);

    setTimeout(() => {
      const newLog = `${selectedPet.name} 使用了 ${selectedPet.abilities[1] || '普通攻击'}！`;
      setBattleLog((prev) => [...prev, newLog]);
    }, 3000);

    setTimeout(() => {
      const newLog = `${selectedOpponent.name} 受到了重创！`;
      setBattleLog((prev) => [...prev, newLog]);
    }, 4500);

    // 决定战斗结果
    setTimeout(() => {
      // 简单随机结果 (70% 胜率)
      const isVictory = Math.random() < 0.7;

      setBattleResult({
        victory: isVictory,
        experienceGained: isVictory ? 25 : 10,
        rewards: isVictory ? ['经验值 +25', '稀有物品 x1'] : ['经验值 +10'],
      });

      const resultLog = isVictory
        ? `战斗结束！${selectedPet.name} 获胜！`
        : `战斗结束！${selectedOpponent.name} 获胜！`;

      setBattleLog((prev) => [...prev, resultLog]);
      setBattleState('result');
    }, 6000);
  };

  // 返回选择页面
  const backToSelection = () => {
    setBattleState('selection');
    setSelectedOpponent(null);
    setBattleResult(null);
    setBattleLog([]);
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8 w-full max-w-lg">
          <p className="text-yellow-700">请连接钱包以访问战斗竞技场</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">
          连接钱包
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">战斗竞技场</h1>

      {battleState === 'selection' && (
        <div>
          {/* 宠物选择 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">选择你的宠物</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {myPets.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => selectPet(pet)}
                  className={`cursor-pointer border rounded-lg overflow-hidden transition-all ${
                    selectedPet?.id === pet.id
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex p-3">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-16 h-16 object-cover rounded mr-3"
                    />
                    <div>
                      <h3 className="font-bold">{pet.name}</h3>
                      <p className="text-sm text-gray-600">
                        Lv. {pet.level} {pet.species}
                      </p>
                      <div className="flex mt-1">
                        {pet.abilities.map((ability, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs mr-1 px-1.5 py-0.5 rounded"
                          >
                            {ability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 对手选择 */}
          {selectedPet && (
            <div>
              <h2 className="text-xl font-bold mb-4">选择对手</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {opponentsList.map((opponent) => (
                  <div
                    key={opponent.id}
                    onClick={() => selectOpponent(opponent)}
                    className={`cursor-pointer border rounded-lg overflow-hidden transition-all ${
                      selectedOpponent?.id === opponent.id
                        ? 'border-red-500 bg-red-50 shadow-md'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex p-3">
                      <img
                        src={opponent.image}
                        alt={opponent.name}
                        className="w-16 h-16 object-cover rounded mr-3"
                      />
                      <div>
                        <h3 className="font-bold">{opponent.name}</h3>
                        <p className="text-sm text-gray-600">
                          Lv. {opponent.level} {opponent.species}
                        </p>
                        <div className="flex mt-1">
                          <span className="text-xs text-gray-500">胜率: {opponent.winRate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={startBattlePreparation}
                  disabled={!selectedOpponent}
                  className={`py-2 px-8 rounded-full font-bold ${
                    !selectedOpponent
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  开始战斗
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {(battleState === 'preparing' || battleState === 'battling' || battleState === 'result') && (
        <div className="bg-gray-800 text-white rounded-lg overflow-hidden">
          {/* 战斗区域 */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              {/* 我方宠物 */}
              <div className="text-center">
                <img
                  src={selectedPet.image}
                  alt={selectedPet.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mx-auto mb-2"
                />
                <h3 className="font-bold">{selectedPet.name}</h3>
                <p className="text-sm text-gray-300">Lv. {selectedPet.level}</p>
              </div>

              {/* VS */}
              <div className="text-3xl font-bold text-red-500">VS</div>

              {/* 对手宠物 */}
              <div className="text-center">
                <img
                  src={selectedOpponent.image}
                  alt={selectedOpponent.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mx-auto mb-2"
                />
                <h3 className="font-bold">{selectedOpponent.name}</h3>
                <p className="text-sm text-gray-300">Lv. {selectedOpponent.level}</p>
              </div>
            </div>

            {/* 战斗日志 */}
            <div className="bg-gray-900 rounded-lg p-3 h-48 overflow-y-auto mb-4">
              {battleLog.map((log, index) => (
                <p key={index} className="mb-2 text-gray-300">
                  <span className="text-xs text-gray-400">[{index + 1}] </span>
                  {log}
                </p>
              ))}

              {battleState === 'preparing' && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mr-2"></div>
                  <p>准备战斗中...</p>
                </div>
              )}
            </div>

            {/* 战斗结果 */}
            {battleResult && (
              <div
                className={`text-center p-4 rounded-lg mb-4 ${
                  battleResult.victory ? 'bg-green-900' : 'bg-red-900'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">
                  {battleResult.victory ? '🎉 战斗胜利！' : '😞 战斗失败'}
                </h3>
                <p className="mb-2">获得 {battleResult.experienceGained} 经验值</p>
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  {battleResult.rewards.map((reward, index) => (
                    <span
                      key={index}
                      className="bg-yellow-800 text-yellow-200 px-2 py-1 rounded text-sm"
                    >
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 按钮 */}
            <div className="flex justify-center gap-3">
              {battleState === 'result' && (
                <>
                  <button
                    onClick={backToSelection}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
                  >
                    返回选择
                  </button>
                  {battleResult?.victory && (
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded">
                      继续冒险
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleArenaPage;

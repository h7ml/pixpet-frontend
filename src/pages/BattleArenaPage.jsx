import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGavel,
  faShield,
  faHeart,
  faArrowLeft,
  faCircleInfo,
  faLock,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// 导入Mock服务
import '../mock';

const BattleArenaPage = () => {
  const location = useLocation();
  const { isConnected } = useAccount();
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [battleState, setBattleState] = useState('selection'); // selection, preparing, battling, result
  const [battleResult, setBattleResult] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [myPets, setMyPets] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWalletWarning, setShowWalletWarning] = useState(false);

  // 获取宠物数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 获取我的宠物
        const petsResponse = await axios.get('/api/my-pets');
        const pets = petsResponse.data || [];
        setMyPets(pets);

        // 从URL参数中获取预选宠物
        const params = new URLSearchParams(location.search);
        const petId = params.get('pet');

        if (petId) {
          const pet = pets.find((p) => p.id === petId);
          if (pet) {
            setSelectedPet(pet);
          }
        }

        // 获取对手列表
        const opponentsResponse = await axios.get('/api/opponents');
        const opponentsData = opponentsResponse.data?.data || [];
        setOpponents(opponentsData);
      } catch (err) {
        console.error('获取数据失败:', err);
        setError('获取数据失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  // 选择宠物
  const selectPet = (pet) => {
    setSelectedPet(pet);
    setBattleState('selection');
    setBattleResult(null);
    setBattleLog([]);
    setShowWalletWarning(false);
  };

  // 选择对手
  const selectOpponent = (opponent) => {
    setSelectedOpponent(opponent);
    setShowWalletWarning(false);
  };

  // 开始战斗准备
  const startBattlePreparation = () => {
    if (!selectedPet || !selectedOpponent) return;

    if (!isConnected) {
      // 显示未连接钱包的提示，但继续允许战斗
      setShowWalletWarning(true);
    }

    setBattleState('preparing');
    setBattleLog([`${selectedPet.name} 准备与 ${selectedOpponent.name} 战斗...`]);

    // 模拟战斗过程
    axios.post('/api/battle-log').then((response) => {
      const battleData = response.data.data;

      // 开始战斗动画
      setBattleState('battling');

      // 显示战斗日志
      let currentLog = 0;
      const logInterval = setInterval(() => {
        if (currentLog < battleData.logs.length) {
          setBattleLog((prev) => [...prev, battleData.logs[currentLog].description]);
          currentLog++;
        } else {
          clearInterval(logInterval);

          // 显示战斗结果
          setBattleResult({
            victory: battleData.result === 'victory',
            experienceGained: isConnected ? battleData.rewards.experience : 0,
            rewards: isConnected
              ? battleData.rewards.items.map(
                  (item) => `${item.name} x${item.quantity} (${item.rarity})`
                )
              : ['连接钱包以获得实际奖励'],
          });
          setBattleState('result');
        }
      }, 1500);
    });
  };

  // 返回选择页面
  const backToSelection = () => {
    setBattleState('selection');
    setSelectedOpponent(null);
    setBattleResult(null);
    setBattleLog([]);
    setShowWalletWarning(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
            <p className="text-gray-600">加载战斗场景中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-6">
        <div className="flex items-center text-purple-800">
          <FontAwesomeIcon icon={faCircleInfo} className="text-xl mr-2" />
          <p>
            {isConnected
              ? '已连接钱包，可以参与正式战斗并获得奖励。'
              : '体验模式：您可以体验战斗功能，但需要连接钱包才能获得奖励。'}
            {!isConnected && (
              <span className="ml-2">
                <ConnectButton label="连接钱包获取奖励" />
              </span>
            )}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">提示：</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {showWalletWarning && !isConnected && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faWallet} className="text-xl mr-2" />
            <span>
              <strong>体验模式：</strong>{' '}
              您正在未连接钱包的情况下战斗。可以继续体验战斗过程，但不会获得实际奖励和经验值。
            </span>
          </div>
          <div className="mt-2">
            <ConnectButton />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <FontAwesomeIcon icon={faGavel} className="text-red-500 mr-3" />
          战斗竞技场
          {!isConnected && (
            <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              体验模式
            </span>
          )}
        </h1>
        {!isConnected && <ConnectButton />}
      </div>

      {battleState === 'selection' && (
        <div>
          {/* 宠物选择 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FontAwesomeIcon icon={faHeart} className="text-pink-500 mr-2" />
              选择你的宠物
              {!isConnected && (
                <span className="ml-2 text-sm text-gray-500 flex items-center">
                  <FontAwesomeIcon icon={faLock} className="mr-1" />
                  体验模式
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {myPets.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => selectPet(pet)}
                  className={`cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                    selectedPet?.id === pet.id
                      ? 'ring-2 ring-purple-500 transform scale-[1.02]'
                      : ''
                  }`}
                >
                  <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold">{pet.name}</h3>
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 对手选择 */}
          {selectedPet && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FontAwesomeIcon icon={faShield} className="text-blue-500 mr-2" />
                选择对手
                {!isConnected && (
                  <span className="ml-2 text-sm text-gray-500 flex items-center">
                    <FontAwesomeIcon icon={faLock} className="mr-1" />
                    体验模式
                  </span>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {opponents.map((opponent) => (
                  <div
                    key={opponent.id}
                    onClick={() => selectOpponent(opponent)}
                    className={`cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                      selectedOpponent?.id === opponent.id
                        ? 'ring-2 ring-red-500 transform scale-[1.02]'
                        : ''
                    }`}
                  >
                    <img
                      src={opponent.image}
                      alt={opponent.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{opponent.name}</h3>
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Lv. {opponent.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">种族: {opponent.type}</p>
                      <div className="mb-3">
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded">
                          {opponent.traits.element}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {opponent.traits.personality}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <div className="flex justify-between items-center">
                          <span>胜率: {opponent.winRate}</span>
                          <span>战斗次数: {opponent.battleCount}</span>
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
                  className={`inline-flex items-center py-2 px-8 rounded-full font-bold ${
                    !selectedOpponent
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={faGavel} className="mr-2" />
                  {isConnected ? '开始战斗' : '体验战斗 (无奖励)'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {(battleState === 'preparing' || battleState === 'battling' || battleState === 'result') &&
        selectedPet &&
        selectedOpponent && (
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
                <div className="text-4xl font-bold text-red-500">VS</div>

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
              <div className="bg-gray-900 rounded-lg p-4 h-48 overflow-y-auto mb-4">
                {battleLog.map((log, index) => (
                  <p key={index} className="text-gray-300 mb-2">
                    {log}
                  </p>
                ))}
              </div>

              {/* 战斗结果 */}
              {battleState === 'result' && battleResult && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {battleResult.victory ? '胜利！' : '失败'}
                  </h3>

                  {isConnected ? (
                    <div>
                      <p className="text-gray-300 mb-2">
                        获得经验值：{battleResult.experienceGained}
                      </p>
                      <div className="mb-4">
                        <h4 className="font-bold mb-2">获得奖励：</h4>
                        <ul className="text-gray-300">
                          {battleResult.rewards.map((reward, index) => (
                            <li key={index}>{reward}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-800 p-4 rounded-lg mb-4">
                      <p className="text-yellow-300 mb-2">
                        <FontAwesomeIcon icon={faLock} className="mr-2" />
                        体验模式不会获得实际奖励和经验值
                      </p>
                      <div className="mt-2">
                        <ConnectButton />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={backToSelection}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full inline-flex items-center"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    返回选择
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default BattleArenaPage;

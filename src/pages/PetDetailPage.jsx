import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

// 假数据，实际应从合约获取
const dummyPet = {
  id: 1,
  name: "像素龙",
  image: "https://placehold.co/500x500?text=PixelDragon",
  level: 5,
  species: "Dragon",
  traits: ["Fire", "Brave"],
  experience: 120,
  owner: "0x123...789",
  rarity: "稀有",
  created: "2023-05-12",
  strength: 80,
  agility: 65,
  intelligence: 70,
  charisma: 50,
  luck: 60,
  history: [
    { type: "mint", date: "2023-05-12 12:30", data: "宠物被创建" },
    { type: "battle", date: "2023-05-13 14:15", data: "与 雷霆猫 战斗并获胜" },
    { type: "levelup", date: "2023-05-14 09:45", data: "升级到 Lv.4" },
    { type: "battle", date: "2023-05-15 16:20", data: "与 冰霜龙 战斗并失败" },
    { type: "levelup", date: "2023-05-18 11:10", data: "升级到 Lv.5" }
  ]
};

const PetDetailPage = () => {
  const { id } = useParams();
  const { isConnected, address } = useAccount();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      // 模拟从区块链获取数据的延迟
      setTimeout(() => {
        // 实际项目中，这里应该调用合约获取宠物数据
        setPet(dummyPet);
        // 检查当前用户是否是宠物主人
        setIsOwner(true); // 假设当前用户是宠物主人
        setLoading(false);
      }, 1000);
    };

    if (isConnected) {
      fetchPet();
    } else {
      setLoading(false);
    }
  }, [isConnected, id, address]);

  // 发送消息
  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    // 添加用户消息到聊天历史
    setChatHistory([...chatHistory, { sender: 'user', text: chatMessage }]);

    // 模拟从AI获取宠物响应
    setTimeout(() => {
      // 实际项目中，这里应该调用AI服务获取宠物响应
      const responses = [
        "我喜欢和你在一起！",
        "我今天感觉很有活力！想去战斗！",
        "我觉得我快要升级了！",
        "我想认识其他宠物朋友！",
        "谢谢你照顾我！"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory([...chatHistory, { sender: 'user', text: chatMessage }, { sender: 'pet', text: randomResponse }]);
    }, 1000);

    // 清空输入框
    setChatMessage('');
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8 w-full max-w-lg">
          <p className="text-yellow-700">请连接钱包以查看宠物详情</p>
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

  if (!pet) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8 w-full max-w-lg mx-auto">
        <p className="text-red-700">未找到宠物信息</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左侧：宠物图片和基本信息 */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{pet.name}</h1>
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded-full mr-2">
                Lv. {pet.level}
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                {pet.rarity}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600">物种:</span> {pet.species}
            </div>
            <div className="mb-4">
              <span className="text-gray-600">创建于:</span> {pet.created}
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
            <div className="flex flex-wrap gap-1 mb-4">
              {pet.traits.map((trait, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {trait}
                </span>
              ))}
            </div>
            {isOwner ? (
              <div className="flex justify-between">
                <Link
                  to={`/battle-arena?pet=${pet.id}`}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded"
                >
                  开始战斗
                </Link>
                <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded">
                  培训宠物
                </button>
              </div>
            ) : (
              <Link
                to="/marketplace"
                className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded w-full"
              >
                获取类似宠物
              </Link>
            )}
          </div>
        </div>

        {/* 右侧：标签页内容 */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 标签页导航 */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 font-medium ${activeTab === 'stats'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-purple-500'
                  }`}
                onClick={() => setActiveTab('stats')}
              >
                属性
              </button>
              <button
                className={`flex-1 py-3 font-medium ${activeTab === 'history'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-purple-500'
                  }`}
                onClick={() => setActiveTab('history')}
              >
                历史记录
              </button>
              {isOwner && (
                <button
                  className={`flex-1 py-3 font-medium ${activeTab === 'chat'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-purple-500'
                    }`}
                  onClick={() => setActiveTab('chat')}
                >
                  聊天
                </button>
              )}
            </div>

            {/* 标签页内容 */}
            <div className="p-6">
              {/* 属性标签页 */}
              {activeTab === 'stats' && (
                <div>
                  <h2 className="text-lg font-bold mb-4">宠物属性</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>力量</span>
                          <span>{pet.strength}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${pet.strength}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>敏捷</span>
                          <span>{pet.agility}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${pet.agility}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>智力</span>
                          <span>{pet.intelligence}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${pet.intelligence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>魅力</span>
                          <span>{pet.charisma}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-pink-500 h-2 rounded-full"
                            style={{ width: `${pet.charisma}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>幸运</span>
                          <span>{pet.luck}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${pet.luck}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">宠物专长</h3>
                    <p className="text-gray-600">
                      这只{pet.species}在{pet.strength > 70 ? '力量' : pet.agility > 70 ? '敏捷' : pet.intelligence > 70 ? '智力' : '平衡性'}方面表现出色。
                      适合参加{pet.strength > 70 ? '力量型' : pet.agility > 70 ? '速度型' : pet.intelligence > 70 ? '战术型' : '全能型'}战斗。
                    </p>
                  </div>
                </div>
              )}

              {/* 历史记录标签页 */}
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-lg font-bold mb-4">活动历史</h2>
                  <div className="relative border-l-2 border-gray-200 ml-3">
                    {pet.history.map((event, index) => (
                      <div key={index} className="mb-6 ml-6">
                        <div className="absolute w-3 h-3 bg-purple-600 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                          {event.date}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.type === 'mint' ? '宠物创建' :
                            event.type === 'battle' ? '战斗记录' :
                              event.type === 'levelup' ? '等级提升' :
                                '活动记录'}
                        </h3>
                        <p className="mb-4 text-base font-normal text-gray-600">
                          {event.data}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 聊天标签页 */}
              {activeTab === 'chat' && isOwner && (
                <div>
                  <h2 className="text-lg font-bold mb-4">与{pet.name}聊天</h2>
                  <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                    {chatHistory.length === 0 ? (
                      <p className="text-gray-500 text-center my-8">
                        开始和你的宠物聊天吧！
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {chatHistory.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                          >
                            <div
                              className={`max-w-3/4 rounded-lg px-4 py-2 ${msg.sender === 'user'
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                              <p>{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="和你的宠物说点什么..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg"
                    >
                      发送
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage; 

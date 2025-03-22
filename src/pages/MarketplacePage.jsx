import React, { useState } from 'react';
import { useAccount } from 'wagmi';

// 宠物种类数据（实际项目应从API获取）
const speciesOptions = [
  { id: 1, name: '龙', image: 'https://placehold.co/300x300?text=Dragon' },
  { id: 2, name: '猫', image: 'https://placehold.co/300x300?text=Cat' },
  { id: 3, name: '机器人', image: 'https://placehold.co/300x300?text=Robot' },
  { id: 4, name: '精灵', image: 'https://placehold.co/300x300?text=Fairy' },
];

// 颜色选项
const colorOptions = [
  { name: '红色', value: 'red' },
  { name: '蓝色', value: 'blue' },
  { name: '绿色', value: 'green' },
  { name: '紫色', value: 'purple' },
  { name: '金色', value: 'gold' },
];

const MarketplacePage = () => {
  const { isConnected } = useAccount();
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedColor, setSelectedColor] = useState('red');
  const [previewImage, setPreviewImage] = useState(null);
  const [traits, setTraits] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  // 生成宠物预览
  const generatePreview = async () => {
    if (!selectedSpecies) {
      alert('请选择一个宠物种类');
      return;
    }

    setIsGenerating(true);

    try {
      // 实际项目中，这应该是对AI服务的调用
      // 这里使用了静态图像，但实际实现应该调用AI API
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 模拟网络延迟

      // 设置假预览图片
      setPreviewImage(`https://placehold.co/300x300?text=${selectedSpecies.name}+${selectedColor}`);
    } catch (error) {
      console.error('生成预览失败:', error);
      alert('生成预览失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 铸造宠物
  const mintPet = async () => {
    if (!isConnected) {
      alert('请先连接钱包');
      return;
    }

    if (!selectedSpecies || !previewImage) {
      alert('请先生成宠物预览');
      return;
    }

    setIsMinting(true);

    try {
      // 实际项目中，这应该调用智能合约铸造NFT
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟区块链交易
      alert('宠物铸造成功！');

      // 重置状态
      setSelectedSpecies(null);
      setSelectedColor('red');
      setPreviewImage(null);
      setTraits([]);
    } catch (error) {
      console.error('铸造失败:', error);
      alert('铸造失败，请重试');
    } finally {
      setIsMinting(false);
    }
  };

  // 添加特性
  const addTrait = (trait) => {
    if (!traits.includes(trait)) {
      setTraits([...traits, trait]);
    } else {
      setTraits(traits.filter((t) => t !== trait));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">创建新宠物</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 左侧：宠物定制 */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">选择宠物种类</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {speciesOptions.map((species) => (
                <div
                  key={species.id}
                  onClick={() => setSelectedSpecies(species)}
                  className={`cursor-pointer border rounded-lg p-2 text-center transition-all ${
                    selectedSpecies?.id === species.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <img
                    src={species.image}
                    alt={species.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-medium">{species.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">选择颜色</h2>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedColor === color.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">添加特性 (可选)</h2>
            <div className="flex flex-wrap gap-2">
              {['快速', '强壮', '聪明', '友好', '坚韧', '神秘'].map((trait) => (
                <button
                  key={trait}
                  onClick={() => addTrait(trait)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    traits.includes(trait)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generatePreview}
            disabled={!selectedSpecies || isGenerating}
            className={`w-full py-3 px-4 rounded-lg font-bold mb-3 ${
              !selectedSpecies || isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isGenerating ? '生成中...' : '生成预览'}
          </button>
        </div>

        {/* 右侧：宠物预览和铸造 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">宠物预览</h2>

          <div className="aspect-square bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden border">
            {previewImage ? (
              <img src={previewImage} alt="宠物预览" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-center p-4">
                {isGenerating ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-2"></div>
                    <p>AI 正在生成您的宠物...</p>
                  </div>
                ) : (
                  <p>选择宠物类型和特性后生成预览</p>
                )}
              </div>
            )}
          </div>

          {previewImage && (
            <div className="mb-4 p-3 bg-white rounded-lg">
              <h3 className="font-bold mb-2">宠物信息</h3>
              <p>
                <span className="font-medium">种类:</span> {selectedSpecies?.name}
              </p>
              <p>
                <span className="font-medium">颜色:</span>{' '}
                {colorOptions.find((c) => c.value === selectedColor)?.name}
              </p>
              {traits.length > 0 && (
                <div>
                  <span className="font-medium">特性:</span> {traits.join(', ')}
                </div>
              )}
            </div>
          )}

          <button
            onClick={mintPet}
            disabled={!previewImage || isMinting || !isConnected}
            className={`w-full py-3 px-4 rounded-lg font-bold ${
              !previewImage || isMinting || !isConnected
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {!isConnected ? '请先连接钱包' : isMinting ? '铸造中...' : '铸造宠物 (0.01 ETH)'}
          </button>

          {previewImage && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              铸造后，这个宠物将永久保存在区块链上并成为您的NFT资产
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;

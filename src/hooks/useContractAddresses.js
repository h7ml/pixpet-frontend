import { useNetwork } from 'wagmi';

// 定义不同网络的合约地址
const CONTRACT_ADDRESSES = {
  // Monad主网
  1975: {
    PixPetNFT: '0xA123B456C789D012E345F678G901H234I567J8',
    PixPetTraits: '0xB234C567D890E123F456G789H012I345J678K',
    PixPetMarketplace: '0xC345D678E901F234G567H890I123J456K789L',
    PixPetBattle: '0xD456E789F012G345H678I901J234K567L890M'
  },
  // Monad测试网
  31338: {
    PixPetNFT: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    PixPetTraits: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',
    PixPetMarketplace: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
    PixPetBattle: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3'
  },
  // 以太坊主网（保留，但本项目专注于Monad链）
  1: {
    PixPetNFT: '',
    PixPetTraits: '',
    PixPetMarketplace: '',
    PixPetBattle: ''
  },
  // Goerli测试网（保留，但本项目专注于Monad链）
  5: {
    PixPetNFT: '',
    PixPetTraits: '',
    PixPetMarketplace: '',
    PixPetBattle: ''
  }
};

// 创建hook获取当前网络的合约地址
export const useContractAddresses = () => {
  const { chain } = useNetwork();
  const chainId = chain?.id || 31338; // 默认使用Monad测试网

  // 获取特定合约地址
  const getContractAddress = (contractName) => {
    // 尝试获取当前网络的地址，如果没有则使用默认网络
    const addresses = CONTRACT_ADDRESSES[chainId] || CONTRACT_ADDRESSES[31338];
    return addresses[contractName];
  };

  return {
    getContractAddress,
    PixPetNFTAddress: getContractAddress('PixPetNFT'),
    PixPetTraitsAddress: getContractAddress('PixPetTraits'),
    PixPetMarketplaceAddress: getContractAddress('PixPetMarketplace'),
    PixPetBattleAddress: getContractAddress('PixPetBattle')
  };
};

export default useContractAddresses; 

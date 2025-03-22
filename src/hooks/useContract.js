import { useContractReads, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import useContractAddresses from './useContractAddresses';

// 导入合约ABI
import PixPetNFTABI from '../contracts/PixPetNFT.json';
import PixPetTraitsABI from '../contracts/PixPetTraits.json';
import PixPetMarketplaceABI from '../contracts/PixPetMarketplace.json';
import PixPetBattleABI from '../contracts/PixPetBattle.json';

// PixPetNFT 合约hook
export const usePixPetNFTContract = () => {
  const { PixPetNFTAddress } = useContractAddresses();

  // 读取合约状态
  const useReadPixPetNFT = (functionName, args = [], options = {}) => {
    return useContractReads({
      contracts: [
        {
          address: PixPetNFTAddress,
          abi: PixPetNFTABI.abi,
          functionName,
          args,
        },
      ],
      ...options,
    });
  };

  // 准备写入合约
  const usePrepareWritePixPetNFT = (functionName, args = [], options = {}) => {
    return usePrepareContractWrite({
      address: PixPetNFTAddress,
      abi: PixPetNFTABI.abi,
      functionName,
      args,
      ...options,
    });
  };

  // 写入合约
  const useWritePixPetNFT = (functionName, options = {}) => {
    const preparation = usePrepareWritePixPetNFT(functionName, options.args || [], options);
    return useContractWrite(preparation.config);
  };

  // 铸造宠物
  const useMintPet = (quantity = 1, speciesId = 1, options = {}) => {
    return useWritePixPetNFT('mintPet', {
      args: [quantity, speciesId],
      ...options,
      overrides: {
        value: ethers.utils.parseEther("0.01"),
        ...(options.overrides || {}),
      },
    });
  };

  // 获取宠物详情
  const useGetPet = (tokenId, options = {}) => {
    return useReadPixPetNFT('getPet', [tokenId], options);
  };

  // 为宠物增加经验
  const useAddExperience = (tokenId, exp, options = {}) => {
    return useWritePixPetNFT('addExperience', {
      args: [tokenId, exp],
      ...options,
    });
  };

  // 宠物进化
  const useEvolvePet = (tokenId, options = {}) => {
    return useWritePixPetNFT('evolve', {
      args: [tokenId],
      ...options,
    });
  };

  return {
    useReadPixPetNFT,
    usePrepareWritePixPetNFT,
    useWritePixPetNFT,
    useMintPet,
    useGetPet,
    useAddExperience,
    useEvolvePet,
  };
};

// PixPetTraits 合约hook
export const usePixPetTraitsContract = () => {
  const { PixPetTraitsAddress } = useContractAddresses();

  // 读取合约状态
  const useReadPixPetTraits = (functionName, args = [], options = {}) => {
    return useContractReads({
      contracts: [
        {
          address: PixPetTraitsAddress,
          abi: PixPetTraitsABI.abi,
          functionName,
          args,
        },
      ],
      ...options,
    });
  };

  // 准备写入合约
  const usePrepareWritePixPetTraits = (functionName, args = [], options = {}) => {
    return usePrepareContractWrite({
      address: PixPetTraitsAddress,
      abi: PixPetTraitsABI.abi,
      functionName,
      args,
      ...options,
    });
  };

  // 写入合约
  const useWritePixPetTraits = (functionName, options = {}) => {
    const preparation = usePrepareWritePixPetTraits(functionName, options.args || [], options);
    return useContractWrite(preparation.config);
  };

  // 获取特质详情
  const useGetTraitDetails = (traitId, options = {}) => {
    return useReadPixPetTraits('getTraitDetails', [traitId], options);
  };

  // 合并特质
  const useCombineTraits = (traitId1, traitId2, options = {}) => {
    return useWritePixPetTraits('combineTraits', {
      args: [traitId1, traitId2],
      ...options,
    });
  };

  return {
    useReadPixPetTraits,
    usePrepareWritePixPetTraits,
    useWritePixPetTraits,
    useGetTraitDetails,
    useCombineTraits,
  };
};

// PixPetMarketplace 合约hook
export const usePixPetMarketplaceContract = () => {
  const { PixPetMarketplaceAddress } = useContractAddresses();

  // 读取合约状态
  const useReadPixPetMarketplace = (functionName, args = [], options = {}) => {
    return useContractReads({
      contracts: [
        {
          address: PixPetMarketplaceAddress,
          abi: PixPetMarketplaceABI.abi,
          functionName,
          args,
        },
      ],
      ...options,
    });
  };

  // 准备写入合约
  const usePrepareWritePixPetMarketplace = (functionName, args = [], options = {}) => {
    return usePrepareContractWrite({
      address: PixPetMarketplaceAddress,
      abi: PixPetMarketplaceABI.abi,
      functionName,
      args,
      ...options,
    });
  };

  // 写入合约
  const useWritePixPetMarketplace = (functionName, options = {}) => {
    const preparation = usePrepareWritePixPetMarketplace(functionName, options.args || [], options);
    return useContractWrite(preparation.config);
  };

  // 创建销售
  const useCreateSale = (tokenId, price, options = {}) => {
    return useWritePixPetMarketplace('createSale', {
      args: [tokenId, price],
      ...options,
    });
  };

  // 取消销售
  const useCancelSale = (tokenId, options = {}) => {
    return useWritePixPetMarketplace('cancelSale', {
      args: [tokenId],
      ...options,
    });
  };

  // 购买宠物
  const useBuyPet = (tokenId, price, options = {}) => {
    return useWritePixPetMarketplace('buyPet', {
      args: [tokenId],
      ...options,
      overrides: {
        value: price,
        ...(options.overrides || {}),
      },
    });
  };

  // 获取所有销售
  const useGetAllSales = (page = 0, resultsPerPage = 10, options = {}) => {
    return useReadPixPetMarketplace('getAllSales', [page, resultsPerPage], options);
  };

  // 获取销售详情
  const useGetSaleInfo = (tokenId, options = {}) => {
    return useReadPixPetMarketplace('getSaleInfo', [tokenId], options);
  };

  return {
    useReadPixPetMarketplace,
    usePrepareWritePixPetMarketplace,
    useWritePixPetMarketplace,
    useCreateSale,
    useCancelSale,
    useBuyPet,
    useGetAllSales,
    useGetSaleInfo,
  };
};

// PixPetBattle 合约hook
export const usePixPetBattleContract = () => {
  const { PixPetBattleAddress } = useContractAddresses();

  // 读取合约状态
  const useReadPixPetBattle = (functionName, args = [], options = {}) => {
    return useContractReads({
      contracts: [
        {
          address: PixPetBattleAddress,
          abi: PixPetBattleABI.abi,
          functionName,
          args,
        },
      ],
      ...options,
    });
  };

  // 准备写入合约
  const usePrepareWritePixPetBattle = (functionName, args = [], options = {}) => {
    return usePrepareContractWrite({
      address: PixPetBattleAddress,
      abi: PixPetBattleABI.abi,
      functionName,
      args,
      ...options,
    });
  };

  // 写入合约
  const useWritePixPetBattle = (functionName, options = {}) => {
    const preparation = usePrepareWritePixPetBattle(functionName, options.args || [], options);
    return useContractWrite(preparation.config);
  };

  // 创建战斗
  const useCreateBattle = (challengerPetId, defenderPetId, options = {}) => {
    return useWritePixPetBattle('createBattle', {
      args: [challengerPetId, defenderPetId],
      ...options,
    });
  };

  // 完成战斗
  const useCompleteBattle = (battleId, options = {}) => {
    return useWritePixPetBattle('completeBattle', {
      args: [battleId],
      ...options,
    });
  };

  // 计算战斗结果
  const useCalculateBattleOutcome = (challengerPetId, defenderPetId, options = {}) => {
    return useReadPixPetBattle('calculateBattleOutcome', [challengerPetId, defenderPetId], options);
  };

  // 获取宠物战斗历史
  const useGetPetBattles = (petId, options = {}) => {
    return useReadPixPetBattle('getPetBattles', [petId], options);
  };

  // 获取战斗详情
  const useGetBattleDetails = (battleId, options = {}) => {
    return useReadPixPetBattle('getBattleDetails', [battleId], options);
  };

  // 获取宠物战斗属性
  const useGetPetStats = (petId, options = {}) => {
    return useReadPixPetBattle('getPetStats', [petId], options);
  };

  return {
    useReadPixPetBattle,
    usePrepareWritePixPetBattle,
    useWritePixPetBattle,
    useCreateBattle,
    useCompleteBattle,
    useCalculateBattleOutcome,
    useGetPetBattles,
    useGetBattleDetails,
    useGetPetStats,
  };
};

export default {
  usePixPetNFTContract,
  usePixPetTraitsContract,
  usePixPetMarketplaceContract,
  usePixPetBattleContract,
}; 

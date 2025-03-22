import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
  imTokenWallet,
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

// 导入页面组件
import HomePage from './pages/HomePage';
import MyPetsPage from './pages/MyPetsPage';
import MarketplacePage from './pages/MarketplacePage';
import BattleArenaPage from './pages/BattleArenaPage';
import PetDetailPage from './pages/PetDetailPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';

// 配置链和提供者
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia], // 添加 Sepolia 测试网络
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }), publicProvider()]
);

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;

const { wallets } = getDefaultWallets({
  appName: 'PixPet',
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: '推荐使用',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
  {
    groupName: '更多钱包',
    wallets: [
      walletConnectWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'PixPet', chains }),
      imTokenWallet({ projectId, chains }),
    ],
  },
]);

// 创建wagmi配置
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#6D28D9', // 紫色主题
          borderRadius: 'large',
        })}
        appInfo={{
          appName: 'PixPet',
          learnMoreUrl: 'https://docs.pixpet.h7ml.cn',
        }}
        coolMode // 添加连接动画效果
      >
        <Router>
          <div className="App min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/my-pets" element={<MyPetsPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/battle-arena" element={<BattleArenaPage />} />
                <Route path="/pet/:id" element={<PetDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

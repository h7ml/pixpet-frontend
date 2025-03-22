import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnectWallet,
  argentWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createPublicClient, http } from 'viem';
import '@rainbow-me/rainbowkit/styles.css';

// 导入页面组件
import HomePage from './pages/HomePage';
import MyPetsPage from './pages/MyPetsPage';
import MarketplacePage from './pages/MarketplacePage';
import BattleArenaPage from './pages/BattleArenaPage';
import PetDetailPage from './pages/PetDetailPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 配置钱包
const projectId = 'your_wallet_connect_project_id'; // 需在生产环境中替换

const connectors = connectorsForWallets([
  {
    groupName: '推荐钱包',
    wallets: [
      metaMaskWallet({ projectId, chains: [mainnet] }),
      argentWallet({ projectId, chains: [mainnet] }),
      coinbaseWallet({ appName: 'PixPet', chains: [mainnet] }),
      walletConnectWallet({ projectId, chains: [mainnet] }),
      rainbowWallet({ projectId, chains: [mainnet] }),
    ],
  },
]);

// 配置Wagmi客户端
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
  connectors
});

function App() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={[mainnet]}>
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

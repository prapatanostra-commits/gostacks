import { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';
import { STACKS_MAINNET } from '@stacks/network';
import './App.css'; // Kamu bisa gunakan CSS bawaan Vite atau modifikasi sendiri

// Inisialisasi Konfigurasi Aplikasi Stacks
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

function App() {
  const [userData, setUserData] = useState<any>(null);
  const [tapCount, setTapCount] = useState(0);

  // Cek apakah user sudah login saat komponen dimuat
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    }
  }, []);

  // Fungsi Login Wallet
  const authenticate = () => {
    showConnect({
      appDetails: {
        name: 'GoStacks Tap2Earn',
        icon: window.location.origin + '/vite.svg', // Gunakan icon lokal
      },
      redirectTo: '/',
      onFinish: () => {
        setUserData(userSession.loadUserData());
      },
      userSession,
    });
  };

  // Fungsi Logout
  const disconnect = () => {
    userSession.signUserOut('/');
    setUserData(null);
    setTapCount(0);
  };

  // Fungsi Tap Internal
  const handleTap = () => {
    setTapCount((prev) => prev + 1);
  };

  // Kerangka untuk interaksi Smart Contract (Klaim Reward / Simpan Tap)
  const submitTapsToChain = async () => {
    if (!userData) return;
    
    // Ganti dengan alamat contract dan fungsi yang sesuai dengan arsitekturmu
    const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    const contractName = 'gostacks-core-v1';
    const functionName = 'record-taps';

    const network = STACKS_MAINNET; // Ganti ke StacksMainnet() saat production

    await openContractCall({
      network,
      contractAddress,
      contractName,
      functionName,
      functionArgs: [], // Masukkan argumen (misal: uint(tapCount)) menggunakan import { uintCV } dari @stacks/transactions
      onFinish: (data) => {
        console.log('Transaksi berhasil di-broadcast:', data);
        alert('Taps berhasil dikirim ke jaringan Stacks!');
        setTapCount(0); // Reset tap setelah berhasil
      },
      onCancel: () => {
        console.log('Transaksi dibatalkan user');
      },
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>⚡ GoStacks Tap2Earn</h1>
      
      {!userData ? (
        <div>
          <p>Connect your Stacks wallet to start tapping.</p>
          <button onClick={authenticate} style={btnStyle}>
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <p>
            Connected as: <strong>{userData.profile.stxAddress.testnet}</strong>
          </p>
          
          <div style={{ margin: '40px 0' }}>
            <h2 style={{ fontSize: '48px', margin: '10px 0' }}>{tapCount} TAPS</h2>
            <button 
              onClick={handleTap} 
              style={{ ...btnStyle, fontSize: '24px', padding: '20px 40px', borderRadius: '50px' }}
            >
              👇 TAP HERE 👇
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={submitTapsToChain} style={{ ...btnStyle, backgroundColor: '#5546FF' }}>
              Sync to Blockchain
            </button>
            <button onClick={disconnect} style={{ ...btnStyle, backgroundColor: '#ff4c4c' }}>
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styling sederhana
const btnStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#2b2b2b',
  color: 'white',
  fontWeight: 'bold',
};

export default App;

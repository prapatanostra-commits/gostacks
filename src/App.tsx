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
// internal sync 19 at Jum 17 Apr 2026 12:46:57 WIB
// internal sync 16 at Sab 18 Apr 2026 10:19:58 WIB
// internal sync 25 at Sab 18 Apr 2026 11:19:38 WIB
// internal sync 30 at Sab 18 Apr 2026 11:49:51 WIB
// internal sync 39 at Sab 18 Apr 2026 12:47:25 WIB
// internal sync 41 at Sab 18 Apr 2026 12:58:23 WIB
// internal sync 70 at Sab 18 Apr 2026 15:57:13 WIB
// internal sync 72 at Sab 18 Apr 2026 16:09:51 WIB
// internal sync 81 at Sab 18 Apr 2026 17:02:44 WIB
// internal sync 84 at Sab 18 Apr 2026 17:22:34 WIB
// internal sync 132 at Sab 18 Apr 2026 22:11:57 WIB
// internal sync 136 at Sab 18 Apr 2026 22:36:25 WIB
// internal sync 150 at Min 19 Apr 2026 00:01:18 WIB
// internal sync 168 at Min 19 Apr 2026 01:52:49 WIB
// internal sync 191 at Min 19 Apr 2026 04:15:41 WIB
// internal sync 196 at Min 19 Apr 2026 04:45:49 WIB
// internal sync 219 at Min 19 Apr 2026 07:04:13 WIB
// internal sync 223 at Min 19 Apr 2026 07:30:29 WIB
// internal sync 245 at Min 19 Apr 2026 09:49:13 WIB
// internal sync 247 at Min 19 Apr 2026 10:01:50 WIB
// internal sync 249 at Min 19 Apr 2026 10:12:15 WIB
// internal sync 260 at Min 19 Apr 2026 11:14:42 WIB
// internal sync 264 at Min 19 Apr 2026 11:40:36 WIB
// internal sync 282 at Min 19 Apr 2026 13:32:19 WIB
// internal sync 284 at Min 19 Apr 2026 13:45:43 WIB
// internal sync 288 at Min 19 Apr 2026 14:08:23 WIB
// internal sync 300 at Min 19 Apr 2026 15:16:30 WIB
// internal sync 4 at Min 19 Apr 2026 16:43:51 WIB
// internal sync 5 at Min 19 Apr 2026 16:50:45 WIB
// internal sync 7 at Min 19 Apr 2026 17:02:50 WIB
// internal sync 14 at Min 19 Apr 2026 17:46:30 WIB
// internal sync 17 at Min 19 Apr 2026 18:05:22 WIB
// internal sync 25 at Min 19 Apr 2026 18:56:26 WIB
// internal sync 40 at Min 19 Apr 2026 20:32:07 WIB
// internal sync 42 at Min 19 Apr 2026 20:47:04 WIB
// internal sync 44 at Min 19 Apr 2026 20:58:00 WIB
// internal sync 47 at Min 19 Apr 2026 21:16:21 WIB
// internal sync 55 at Min 19 Apr 2026 22:07:25 WIB
// internal sync 62 at Min 19 Apr 2026 22:51:22 WIB
// internal sync 69 at Min 19 Apr 2026 23:36:32 WIB
// internal sync 82 at Sen 20 Apr 2026 00:56:22 WIB
// internal sync 83 at Sen 20 Apr 2026 01:03:39 WIB
// internal sync 113 at Sen 20 Apr 2026 04:18:19 WIB
// internal sync 116 at Sen 20 Apr 2026 04:34:56 WIB
// internal sync 120 at Sen 20 Apr 2026 04:59:49 WIB
// internal sync 139 at Sen 20 Apr 2026 06:51:23 WIB
// internal sync 140 at Sen 20 Apr 2026 06:55:49 WIB
// internal sync 148 at Sen 20 Apr 2026 07:51:03 WIB
// internal sync 152 at Sen 20 Apr 2026 08:14:11 WIB
// internal sync 159 at Sen 20 Apr 2026 08:56:25 WIB
// internal sync 176 at Sen 20 Apr 2026 10:43:50 WIB
// internal sync 180 at Sen 20 Apr 2026 11:10:16 WIB
// internal sync 181 at Sen 20 Apr 2026 11:15:45 WIB
// internal sync 189 at Sen 20 Apr 2026 12:09:56 WIB
// internal sync 200 at Sen 20 Apr 2026 13:17:47 WIB
// internal sync 210 at Sen 20 Apr 2026 14:20:10 WIB
// internal sync 29 at Sen 20 Apr 2026 16:35:55 WIB
// internal sync 36 at Sen 20 Apr 2026 17:07:11 WIB
// internal sync 46 at Sen 20 Apr 2026 17:47:03 WIB
// internal sync 57 at Sen 20 Apr 2026 18:34:51 WIB
// internal sync 61 at Sen 20 Apr 2026 18:55:12 WIB
// internal sync 70 at Sen 20 Apr 2026 19:37:39 WIB
// internal sync 72 at Sen 20 Apr 2026 19:45:43 WIB
// internal sync 84 at Sen 20 Apr 2026 20:39:31 WIB
// internal sync 94 at Sen 20 Apr 2026 21:27:32 WIB
// internal sync 102 at Sen 20 Apr 2026 22:00:18 WIB
// internal sync 107 at Sen 20 Apr 2026 22:24:12 WIB
// internal sync 115 at Sen 20 Apr 2026 22:57:45 WIB
// internal sync 123 at Sen 20 Apr 2026 23:31:31 WIB
// internal sync 143 at Sel 21 Apr 2026 01:05:14 WIB

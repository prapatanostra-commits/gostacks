import 'dotenv/config';
import fs from 'fs';

// Cuma butuh dari transactions
import pkgTx from '@stacks/transactions';
const { makeContractDeploy, broadcastTransaction, AnchorMode } = pkgTx;

async function deployContract() {
  // Baca file kontrak dari folder contracts
  const codeBody = fs.readFileSync('./contracts/racestacks.clar', 'utf8');
  
  // Ambil private key dari .env
  const senderKey = process.env.PRIVATE_KEY;

  console.log("Membangun transaksi untuk racestacks...");

  const txOptions = {
    contractName: 'racestacks',
    codeBody: codeBody,
    senderKey: senderKey,
    network: 'mainnet', // <-- Cukup pakai string ini aja!
    anchorMode: AnchorMode.OnChainOnly,
  };

  try {
    // Sign transaksi
    const transaction = await makeContractDeploy(txOptions);
    
    // Broadcast ke Mainnet
    const broadcastResponse = await broadcastTransaction(transaction, 'mainnet'); // <-- String juga di sini
    
    console.log("🚀 Berhasil di-broadcast ke Mainnet!");
    console.log("Hasil:", broadcastResponse);
    console.log("Cek txid di atas lewat Stacks Explorer.");
  } catch (error) {
    console.error("Gagal deploy:", error);
  }
}

deployContract();

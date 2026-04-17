import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import pkgTx from '@stacks/transactions';
const { makeContractDeploy, broadcastTransaction, AnchorMode, getAddressFromPrivateKey, TransactionVersion } = pkgTx;

async function deployContract() {
  try {
    const contractPath = path.resolve(__dirname, '../contracts/gostacks.clar');
    const codeBody = fs.readFileSync(contractPath, 'utf8');
    const senderKey = process.env.PRIVATE_KEY;

    if (!senderKey) {
      throw new Error("Private key tidak ditemukan di file .env!");
    }

    // --- BAGIAN BARU: AMBIL NONCE TERBARU ---
    const address = getAddressFromPrivateKey(senderKey, TransactionVersion.Mainnet);
    console.log(`Mengambil nonce untuk alamat: ${address}`);
    
    const response = await fetch(`https://api.mainnet.hiro.so/v2/accounts/${address}?proof=0`);
    const accountData = await response.json();
    const nextNonce = accountData.nonce;
    
    console.log(`Nonce yang akan digunakan: ${nextNonce}`);
    console.log("-----------------------------------------");
    console.log("Membangun transaksi untuk: gostacks");
    // ----------------------------------------

    const txOptions = {
      contractName: 'gostacks',
      codeBody: codeBody,
      senderKey: senderKey,
      network: 'mainnet', 
      anchorMode: AnchorMode.OnChainOnly,
      nonce: nextNonce, // Memasukkan nonce secara manual
    };

    const transaction = await makeContractDeploy(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, 'mainnet');
    
    if (broadcastResponse.error) {
      throw new Error(`Broadcast gagal: ${broadcastResponse.error} ${broadcastResponse.reason || ''}`);
    }

    console.log("🚀 Berhasil di-broadcast ke Mainnet!");
    console.log("Transaction ID (TXID):", broadcastResponse.txid);
    console.log("Cek status di: https://explorer.hiro.so/txid/" + broadcastResponse.txid);

  } catch (error) {
    console.error("❌ Gagal deploy:");
    console.error(error.message);
  }
}

deployContract();

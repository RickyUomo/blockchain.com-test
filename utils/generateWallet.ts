import * as ecc from 'tiny-secp256k1'; // Tiny library for elliptic curve cryptography
import * as bitcoin from 'bitcoinjs-lib'; // Bitcoin library
import * as bip39 from 'bip39'; // Mnemonic utility
import BIP32Factory from 'bip32';
import { BIP32Interface } from 'bip32';

const network = bitcoin.networks.testnet; // Use Bitcoin testnet network

export function generateWallet() {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  // Create root node
  const bip32 = BIP32Factory(ecc);
  const root = bip32.fromSeed(seed, network);

  // Derive an address (Testnet BIP44 path)
  const child = root.derivePath("m/44'/1'/0'/0/0");

  // Generate address
  const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network });

  return {
    address,
    mnemonic,
    publicKey: child.publicKey.toString(),
    privateKey: child.toWIF(), // Wallet Import Format
  };
}

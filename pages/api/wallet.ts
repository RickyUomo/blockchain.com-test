import type { NextApiRequest, NextApiResponse } from 'next';
import { generateWallet } from '@/utils/generateWallet';

type WalletResponse = {
  address: string;
  mnemonic: string;
  publicKey: string;
  privateKey: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WalletResponse>
) {
  // Generate wallet
  const wallet = generateWallet();

  // Respond with wallet details
  res.status(200).json(wallet);
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { generateWallet } from '@/utils/generateWallet';

type WalletResponse = {
  address: string;
  // mnemonic: string;
  // publicKey: string;
  // privateKey: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WalletResponse>
) {

  try {
    const wallet = generateWallet();

    if(!wallet) {
      throw Error('Error occur when generating wallet')
    }
    
    res.status(200).json(wallet);
  } catch(error) {
    console.log('error occur', error)
  }
}

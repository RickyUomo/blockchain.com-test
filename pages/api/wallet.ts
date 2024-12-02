import type { NextApiRequest, NextApiResponse } from 'next';
import { generateWallet } from '@/utils/generateWallet';

type WalletResponse = {
  address: string;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WalletResponse | ErrorResponse>
) {

  try {
    const wallet = generateWallet();

    if(!wallet) {
      throw Error('Error occur when generating wallet')
    }
    
    res.status(200).json(wallet);
  } catch(error) {
    console.error('error occur', error)
    res.status(500).json({ error: 'Failed to generate wallet' });
  }
}

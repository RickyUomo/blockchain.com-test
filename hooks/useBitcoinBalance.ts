// hooks/useBitcoinBalance.ts
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';

interface BlockCypherResponse {
  address: string;
  total_received: string;
  total_sent: string;
  balance: string;
  unconfirmed_balance: string;
  final_balance: string;
}

export const useBitcoinBalance = (
  address: string | null | undefined
) => {
  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery<BlockCypherResponse>({
    queryKey: ['bitcoinBalance', address],
    queryFn: async () => {
      // Return early if no address
      if (!address) {
        throw new Error('Address is required');
      }

      const response = await fetch(
        `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      return {
        ...data,
        balance: data.balance.toString(),
        unconfirmed_balance: data.unconfirmed_balance.toString(),
        total_received: data.total_received.toString(),
        total_sent: data.total_sent.toString(),
        final_balance: data.final_balance.toString()
      };
    },
    // Don't run the query if there's no address
    enabled: !!address,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const formatBTC = (satoshis: string) => {
    return new BigNumber(satoshis)
      .dividedBy(100000000)
      .toFixed(8);
  };

  return {
    data,
    isLoading,
    isError,
    error,
    formatBTC,
  };
};
import Head from "next/head";
import { Box, Center, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PaymentForm } from "@/components/PaymentForm";
import { useBitcoinBalance } from "@/hooks/useBitcoinBalance";

type Wallet = {
  address: string;
};

type PaymentStatus = "initiated" | "processing" | "completed" | "fail";

export default function Home() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [amount, setAmount] = useState<string>("");
  const { data, isLoading, isError, error, formatBTC } = useBitcoinBalance(wallet?.address);

  const fetchWallet = async () => {
    const response = await fetch("/api/wallet");
    const data: Wallet = await response.json();
    setWallet(data);
  };

  if (isLoading) {
    return <div>Loading balance...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <Head>
        <title>Blockchain.com test</title>
        <meta name="description" content="A simple bitcoin tesetnet QR code payment app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center minH="100vh">
        {!wallet && <PrimaryButton text="Create Wallet" onClick={fetchWallet} />}

        <Text>{data ? `${formatBTC(data.balance)} BTC` : "no balance"} </Text>

        {wallet && (
          <Box>
            <Text>
              <strong>Address:</strong> {wallet.address}
            </Text>
            <Box my={10}>
              <QRCodeSVG value={`bitcoin:${wallet.address}?amount=${0.00029349}`} />
            </Box>
            <PaymentForm amount={amount} setAmount={setAmount} />
          </Box>
        )}
      </Center>
    </>
  );
}

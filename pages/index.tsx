import Head from "next/head";
import { Box, Center, Button } from "@chakra-ui/react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { PrimaryButton } from "@/components/PrimaryButton";
import { PaymentForm } from "@/components/PaymentForm";

type Wallet = {
  address: string;
};

type PaymentStatus = "initiated" | "processing" | "completed" | "fail";

export default function Home() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | undefined>(undefined);

  const fetchWallet = async () => {
    const response = await fetch("/api/wallet");
    const data: Wallet = await response.json();
    setWallet(data);
  };

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

        {wallet && (
          <div>
            <p>
              <strong>Address:</strong> {wallet.address}
            </p>
            {paymentStatus === "initiated" && <QRCodeSVG value="https://reactjs.org/" />}

            <PaymentForm />
          </div>
        )}
      </Center>
    </>
  );
}

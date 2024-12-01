import Head from "next/head";
import { Box, Center, Button } from "@chakra-ui/react";

export default function Home() {
	return (
		<>
			<Head>
				<title>Blockchain.com test</title>
				<meta
					name="description"
					content="A simple bitcoin tesetnet QR code payment app"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Center minH="100vh">
				<Button>Create Wallet</Button>
			</Center>
		</>
	);
}

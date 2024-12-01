import { useState } from "react";
import { FormControl, FormLabel, FormErrorMessage, Box, Input } from "@chakra-ui/react";
import { PrimaryButton } from "./PrimaryButton";

export const PaymentForm = () => {
  const [amount, setAmount] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value);

  return (
    <Box>
      <FormControl isRequired>
        <FormLabel>Payment amount</FormLabel>
        <Input placeholder="Amount" onChange={handleInputChange} value={amount} />
      </FormControl>
      <PrimaryButton text="submit" onClick={() => {}} isDisabled={!amount} />
    </Box>
  );
};

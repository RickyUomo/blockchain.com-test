import React from "react";
import { Button } from "@chakra-ui/react";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export const PrimaryButton = ({ text, onClick, isDisabled = false }: PrimaryButtonProps) => {
  return (
    <Button
      bg={isDisabled ? "gray.400" : "blue.100"}
      _hover={{ bg: isDisabled ? "gray.400" : "blue.100" }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

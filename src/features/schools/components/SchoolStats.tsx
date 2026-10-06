import React from "react";
import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";
import { colors, radius } from "../../../theme/tokens";

export function SchoolStats({
  schoolCount,
  classCount,
  label = "Escolas cadastradas",
  secondaryLabel = "Turmas cadastradas",
  variant = "dashboard",
}: {
  schoolCount: number;
  classCount: number;
  label?: string;
  secondaryLabel?: string;
  variant?: "dashboard" | "details";
}) {
  const isDetails = variant === "details";
  return (
    <HStack
      bg={colors.primaryDark}
      borderRadius={radius.lg}
      p={isDetails ? 19 : 20}
      mt={isDetails ? 23 : 25}
      mb={isDetails ? 18 : 30}
      alignItems="center"
    >
      <VStack flex={1} space={isDetails ? undefined : "xs"}>
        <Text color="#FFFFFF" fontSize={isDetails ? 26 : 29} fontWeight="$extrabold">
          {schoolCount}
        </Text>
        <Text color="#C6DED4" fontSize={11} mt={isDetails ? 3 : undefined}>
          {label}
        </Text>
      </VStack>
      <Box
        height={isDetails ? 42 : 44}
        width={1}
        bg="#477568"
        mx={isDetails ? 30 : 18}
      />
      <VStack flex={1} space={isDetails ? undefined : "xs"}>
        <Text color="#FFFFFF" fontSize={isDetails ? 26 : 29} fontWeight="$extrabold">
          {classCount}
        </Text>
        <Text
          color="#C6DED4"
          fontSize={11}
          mt={isDetails ? 3 : undefined}
        >
          {secondaryLabel}
        </Text>
      </VStack>
    </HStack>
  );
}

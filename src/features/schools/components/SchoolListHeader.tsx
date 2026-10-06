import React from "react";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { colors } from "../../../theme/tokens";

export function SchoolListHeader({ count }: { count: number }) {
  return (
    <HStack alignItems="center" justifyContent="space-between" mb={14}>
      <VStack space="xs">
        <Text color={colors.text} fontSize={20} fontWeight="$extrabold">
          Unidades escolares
        </Text>
        <Text color={colors.muted} fontSize={12}>
          Gerencie os cadastros da rede
        </Text>
      </VStack>
      <Text color={colors.muted} fontSize={12} fontWeight="$bold">
        {count} itens
      </Text>
    </HStack>
  );
}

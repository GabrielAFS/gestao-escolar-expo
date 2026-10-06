import React from "react";
import { Text, VStack } from "@gluestack-ui/themed";
import { colors, radius } from "../../../theme/tokens";

export function SchoolEmptyState() {
  return (
    <VStack
      alignItems="center"
      py={38}
      px={20}
      bg="#fff"
      borderRadius={radius.lg}
    >
      <Text fontSize={36} color={colors.primary}>
        ⌕
      </Text>
      <Text
        fontSize={16}
        fontWeight="$extrabold"
        color={colors.text}
        mt={10}
      >
        Nenhuma escola encontrada
      </Text>
      <Text color={colors.muted} textAlign="center" mt={7} lineHeight={20}>
        Tente outro termo ou cadastre uma nova unidade.
      </Text>
    </VStack>
  );
}

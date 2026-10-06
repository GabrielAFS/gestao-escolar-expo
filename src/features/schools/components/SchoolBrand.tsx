import React from "react";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import { colors } from "../../../theme/tokens";

export function SchoolBrand() {
  return (
    <HStack alignItems="center" space="sm" mb={30}>
      <Box
        width={38}
        height={38}
        borderRadius={13}
        bg={colors.primary}
        alignItems="center"
        justifyContent="center"
      >
        <Text color="#fff" fontSize={13} fontWeight="$black">
          GE
        </Text>
      </Box>
      <Text
        fontSize={11}
        letterSpacing={1.4}
        color={colors.muted}
        fontWeight="$extrabold"
      >
        GESTÃO MUNICIPAL
      </Text>
    </HStack>
  );
}

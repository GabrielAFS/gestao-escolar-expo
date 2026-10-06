import React from "react";
import { HStack, Pressable, Text } from "@gluestack-ui/themed";
import type { Shift } from "../../../domain/types";
import { ALL_SHIFTS, SHIFTS } from "../../../constants/school";
import { colors } from "../../../theme/tokens";

export function ShiftFilter({
  value,
  onChange,
}: {
  value: Shift | "Todas";
  onChange: (value: Shift | "Todas") => void;
}) {
  return (
    <HStack flexWrap="wrap" space="sm" mb={14}>
      {([ALL_SHIFTS, ...SHIFTS] as const).map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          borderRadius={30}
          px={13}
          py={8}
          bg={value === item ? colors.primary : "#E9EEEA"}
        >
          <Text
            color={value === item ? "#fff" : colors.muted}
            fontSize={11}
            fontWeight="$bold"
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </HStack>
  );
}

import React from "react";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import type { SchoolClass } from "../../../domain/types";
import { colors } from "../../../theme/tokens";

export function ClassCard({
  item,
  onEdit,
  onDelete,
}: {
  item: SchoolClass;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <HStack
      alignItems="center"
      space="sm"
      bg="#fff"
      p={13}
      borderRadius={16}
      borderWidth={1}
      borderColor={colors.border}
      mb={10}
    >
      <Box
        width={40}
        height={40}
        borderRadius={13}
        bg="#F1F5F2"
        alignItems="center"
        justifyContent="center"
      >
        <Text color={colors.primary} fontSize={20}>
          ▤
        </Text>
      </Box>
      <VStack flex={1}>
        <Text fontWeight="$extrabold" color={colors.text} fontSize={14}>
          {item.name}
        </Text>
        <Text color={colors.muted} fontSize={11} mt={5}>
          {item.shift} · Ano letivo {item.schoolYear}
        </Text>
      </VStack>
      <Pressable
        accessibilityLabel={`Editar ${item.name}`}
        onPress={onEdit}
        p={7}
      >
        <Text color={colors.primary} fontSize={12} fontWeight="$bold">
          Editar
        </Text>
      </Pressable>
      <Pressable
        accessibilityLabel={`Excluir ${item.name}`}
        onPress={onDelete}
        width={28}
        height={28}
        borderRadius={10}
        bg={colors.dangerBg}
        alignItems="center"
        justifyContent="center"
      >
        <Text color={colors.danger} fontSize={20}>
          ×
        </Text>
      </Pressable>
    </HStack>
  );
}

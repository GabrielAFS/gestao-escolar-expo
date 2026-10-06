import React from "react";
import { Box, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import type { School } from "../../../domain/types";
import { colors } from "../../../theme/tokens";

export function SchoolCard({
  school,
  onPress,
  onDelete,
}: {
  school: School;
  onPress: () => void;
  onDelete: () => void;
}) {
  return (
    <Pressable onPress={onPress} $pressed={{ opacity: 0.85 }}>
      <HStack
        bg="#fff"
        borderRadius={22}
        p={15}
        mb={12}
        borderWidth={1}
        borderColor="#E8EDE9"
        alignItems="flex-start"
        space="md"
      >
        <Box
          width={43}
          height={43}
          borderRadius={14}
          bg={colors.accent}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={25} color={colors.primary} fontWeight="$semibold">
            ⌂
          </Text>
        </Box>
        <VStack flex={1} pt={2}>
          <Text
            fontSize={15}
            color={colors.text}
            fontWeight="$extrabold"
            lineHeight={21}
          >
            {school.name}
          </Text>
          <Text
            color={colors.muted}
            fontSize={12}
            lineHeight={18}
            mt={5}
            numberOfLines={2}
          >
            {school.address}
          </Text>
          <HStack alignItems="center" space="sm" mt={13} flexWrap="wrap">
            <Box bg="#EEF6F1" borderRadius={20} px={10} py={5}>
              <Text fontSize={11} fontWeight="$bold" color={colors.primary}>
                {school.classes.length}{" "}
                {school.classes.length === 1 ? "turma" : "turmas"}
              </Text>
            </Box>
            <Text color={colors.primary} fontSize={12} fontWeight="$bold">
              Ver detalhes ›
            </Text>
          </HStack>
        </VStack>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Excluir ${school.name}`}
          onPress={onDelete}
          p={5}
          hitSlop={8}
        >
          <Text color="#8C9992" letterSpacing={1}>
            •••
          </Text>
        </Pressable>
      </HStack>
    </Pressable>
  );
}

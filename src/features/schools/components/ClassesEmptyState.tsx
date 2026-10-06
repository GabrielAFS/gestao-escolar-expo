import React from "react";
import { Text, VStack } from "@gluestack-ui/themed";
import { colors } from "../../../theme/tokens";

export function ClassesEmptyState({ hasClasses }: { hasClasses: boolean }) {
  return (
    <VStack bg="#fff" p={25} borderRadius={18} alignItems="center">
      <Text fontWeight="$extrabold" color={colors.text} fontSize={15}>
        {hasClasses ? "Nenhuma turma neste turno" : "Ainda não há turmas"}
      </Text>
      <Text
        textAlign="center"
        color={colors.muted}
        fontSize={12}
        lineHeight={18}
        mt={7}
      >
        Cadastre uma turma para começar a organizar o ano letivo.
      </Text>
    </VStack>
  );
}

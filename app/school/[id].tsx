import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import { Screen } from "../../src/components/Screen";
import { AppButton } from "../../src/components/AppButton";
import { colors } from "../../src/theme/tokens";
import { useSchoolStore } from "../../src/store/useSchoolStore";
import { filterClasses, countSchoolYears } from "../../src/utils/school";
import {
  ClassCard,
  ClassesEmptyState,
  SchoolStats,
  ShiftFilter,
} from "../../src/features/schools/components";
import type { Shift } from "../../src/domain/types";

export default function SchoolDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const school = useSchoolStore((state) =>
    state.schools.find((item) => item.id === id),
  );
  const removeClass = useSchoolStore((state) => state.removeClass);
  const [shift, setShift] = useState<Shift | "Todas">("Todas");
  const classes = useMemo(
    () => filterClasses(school?.classes ?? [], shift),
    [school, shift],
  );

  if (!school) {
    return (
      <Screen>
        <Text
          color={colors.text}
          fontSize={29}
          lineHeight={35}
          fontWeight="$extrabold"
        >
          Escola não encontrada
        </Text>
        <AppButton title="Voltar" onPress={() => router.replace("/")} />
      </Screen>
    );
  }

  const confirmDelete = (classId: string, name: string) =>
    Alert.alert("Excluir turma?", `Deseja remover “${name}”?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => void removeClass(classId),
      },
    ]);

  return (
    <Screen>
      <Pressable onPress={() => router.back()} py={9} mb={24}>
        <Text color={colors.primary} fontWeight="$bold">
          ‹ Todas as escolas
        </Text>
      </Pressable>
      <Box
        width={54}
        height={54}
        borderRadius={18}
        bg={colors.accent}
        alignItems="center"
        justifyContent="center"
        mb={20}
      >
        <Text color={colors.primary} fontSize={30}>
          ⌂
        </Text>
      </Box>
      <Text
        color={colors.primary}
        fontSize={10}
        letterSpacing={1.6}
        fontWeight="$black"
        mb={8}
      >
        UNIDADE ESCOLAR
      </Text>
      <Text
        fontSize={29}
        lineHeight={35}
        fontWeight="$extrabold"
        letterSpacing={-0.8}
        color={colors.text}
      >
        {school.name}
      </Text>
      <Text color={colors.muted} fontSize={13} lineHeight={20} mt={9}>
        ⌖ {school.address}
      </Text>

      <SchoolStats
        schoolCount={school.classes.length}
        classCount={countSchoolYears(school.classes)}
        label="Turmas cadastradas"
        secondaryLabel="Anos letivos"
        variant="details"
      />

      <HStack space="sm" mb={30}>
        <Box flex={1}>
          <AppButton
            title="Editar escola"
            variant="secondary"
            onPress={() =>
              router.push({
                pathname: "/school/form",
                params: { id: school.id },
              })
            }
          />
        </Box>
        <Box flex={1}>
          <AppButton
            title="+ Nova turma"
            onPress={() =>
              router.push({
                pathname: "/school/class-form",
                params: { schoolId: school.id },
              })
            }
          />
        </Box>
      </HStack>

      <HStack alignItems="center" justifyContent="space-between" mb={14}>
        <Text fontSize={19} color={colors.text} fontWeight="$extrabold">
          Turmas da unidade
        </Text>
        <Text fontSize={12} color={colors.muted}>
          {classes.length} de {school.classes.length}
        </Text>
      </HStack>

      <ShiftFilter value={shift} onChange={setShift} />

      {classes.length === 0 ? (
        <ClassesEmptyState hasClasses={school.classes.length > 0} />
      ) : (
        classes.map((item) => (
          <ClassCard
            key={item.id}
            item={item}
            onEdit={() =>
              router.push({
                pathname: "/school/class-form",
                params: { schoolId: school.id, classId: item.id },
              })
            }
            onDelete={() => confirmDelete(item.id, item.name)}
          />
        ))
      )}
    </Screen>
  );
}

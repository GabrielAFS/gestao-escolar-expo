import React from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text } from "@gluestack-ui/themed";
import { Screen } from "../../src/components/Screen";
import { colors } from "../../src/theme/tokens";
import { useSchoolStore } from "../../src/store/useSchoolStore";
import { useClassForm } from "../../src/features/schools/hooks/useClassForm";
import { ClassFormCard } from "../../src/features/schools/components";

export default function ClassFormScreen() {
  const router = useRouter();
  const { schoolId, classId } = useLocalSearchParams<{
    schoolId: string;
    classId?: string;
  }>();
  const school = useSchoolStore((state) =>
    state.schools.find((item) => item.id === schoolId),
  );
  const form = useClassForm(school, classId);

  const submit = async () => {
    try {
      if (await form.submit()) router.back();
    } catch (e) {
      Alert.alert(
        "Não foi possível salvar",
        e instanceof Error ? e.message : "Tente novamente.",
      );
    }
  };

  return (
    <Screen>
      <Pressable onPress={() => router.back()} py={9} mb={28}>
        <Text color={colors.primary} fontWeight="$bold">
          ‹ Voltar para a escola
        </Text>
      </Pressable>
      <Text
        color={colors.primary}
        fontSize={10}
        letterSpacing={1.2}
        fontWeight="$black"
        mb={10}
      >
        TURMAS · {school?.name.toUpperCase() ?? "ESCOLA"}
      </Text>
      <Text
        color={colors.text}
        fontSize={30}
        fontWeight="$extrabold"
        letterSpacing={-0.8}
      >
        {classId ? "Editar turma" : "Nova turma"}
      </Text>
      <Text color={colors.muted} fontSize={14} lineHeight={21} mt={9} mb={25}>
        Defina o nome, turno e ano letivo da turma.
      </Text>
      <ClassFormCard
        name={form.name}
        shift={form.shift}
        year={form.year}
        errors={form.error}
        globalError={form.globalError}
        onNameChange={form.setName}
        onShiftChange={form.setShift}
        onYearChange={form.setYear}
        onSubmit={() => void submit()}
        onCancel={() => router.back()}
        saving={form.saving}
        isEditing={Boolean(classId)}
      />
    </Screen>
  );
}

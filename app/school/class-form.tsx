import React, { useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Screen } from "../../src/components/Screen";
import { Field } from "../../src/components/Field";
import { AppButton } from "../../src/components/AppButton";
import { colors, radius } from "../../src/theme/tokens";
import { useSchoolStore } from "../../src/store/useSchoolStore";
import type { ClassErrors, Shift } from "../../src/domain/types";
import { validateClass } from "../../src/domain/validation";

const shifts: Shift[] = ["Manhã", "Tarde", "Noite", "Integral"];
const initialErrors: ClassErrors = {
  name: "",
  schoolYear: "",
  shift: "",
};

export default function ClassFormScreen() {
  const router = useRouter();
  const { schoolId, classId } = useLocalSearchParams<{
    schoolId: string;
    classId?: string;
  }>();
  const school = useSchoolStore((s) =>
    s.schools.find((item) => item.id === schoolId),
  );
  const existing = school?.classes.find((item) => item.id === classId);
  const saveClass = useSchoolStore((s) => s.saveClass);
  const [name, setName] = useState(existing?.name ?? "");
  const [shift, setShift] = useState<Shift>(existing?.shift ?? "Manhã");
  const [year, setYear] = useState(
    String(existing?.schoolYear ?? new Date().getFullYear()),
  );
  const [error, setError] = useState<ClassErrors>(initialErrors);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    const input = { name, shift, schoolYear: Number(year) };
    const errors = validateClass(input);

    if (errors.name || errors.schoolYear || errors.shift) {
      setError(errors);
      return;
    }

    if (!school) {
      setGlobalError("Escola não encontrada.");
      return;
    }
    setSaving(true);
    setError(initialErrors);
    setGlobalError(null);
    try {
      await saveClass(school.id, input, classId);
      router.back();
    } catch (e) {
      Alert.alert(
        "Não foi possível salvar",
        e instanceof Error ? e.message : "Tente novamente.",
      );
    } finally {
      setSaving(false);
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
      <VStack
        bg="#fff"
        borderRadius={20}
        p={18}
        borderColor={colors.border}
        borderWidth={1}
      >
        <Field
          label="Nome da turma *"
          value={name}
          onChangeText={setName}
          placeholder="Ex.: 2º Ano A"
          autoCapitalize="words"
          error={error.name ? error.name : undefined}
        />
        <Text fontSize={13} fontWeight="$bold" color={colors.text} mb={8}>
          Turno *
        </Text>
        <HStack flexWrap="wrap" space="sm" mb={20}>
          {shifts.map((item) => (
            <Pressable
              key={item}
              onPress={() => setShift(item)}
              borderRadius={radius.md}
              px={13}
              py={10}
              bg={shift === item ? colors.accent : "#EEF2EF"}
              borderWidth={1}
              borderColor={shift === item ? colors.primary : "transparent"}
            >
              <Text
                color={shift === item ? colors.primary : colors.muted}
                fontSize={12}
                fontWeight="$bold"
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </HStack>
        <Field
          label="Ano letivo *"
          value={year}
          onChangeText={setYear}
          placeholder="2026"
          keyboardType="number-pad"
          maxLength={4}
          error={error.schoolYear ? error.schoolYear : undefined}
        />
        {globalError ? (
          <Text color={colors.danger} mb={12} fontSize={13}>
            {globalError}
          </Text>
        ) : null}
        <AppButton
          title={classId ? "Salvar alterações" : "Cadastrar turma"}
          onPress={() => void submit()}
          loading={saving}
        />
        <AppButton
          title="Cancelar"
          onPress={() => router.back()}
          variant="ghost"
          style={{ marginTop: 8 }}
        />
      </VStack>
    </Screen>
  );
}

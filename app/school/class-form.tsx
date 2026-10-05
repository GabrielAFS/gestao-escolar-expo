import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
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
    s.schools.find((item) => item.id === schoolId)
  );
  const existing = school?.classes.find((item) => item.id === classId);
  const saveClass = useSchoolStore((s) => s.saveClass);
  const [name, setName] = useState(existing?.name ?? "");
  const [shift, setShift] = useState<Shift>(existing?.shift ?? "Manhã");
  const [year, setYear] = useState(
    String(existing?.schoolYear ?? new Date().getFullYear())
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
        e instanceof Error ? e.message : "Tente novamente."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹ Voltar para a escola</Text>
      </Pressable>
      <Text style={styles.eyebrow}>
        TURMAS · {school?.name.toUpperCase() ?? "ESCOLA"}
      </Text>
      <Text style={styles.title}>
        {classId ? "Editar turma" : "Nova turma"}
      </Text>
      <Text style={styles.subtitle}>
        Defina o nome, turno e ano letivo da turma.
      </Text>
      <View style={styles.form}>
        <Field
          label='Nome da turma *'
          value={name}
          onChangeText={setName}
          placeholder='Ex.: 2º Ano A'
          autoCapitalize='words'
          error={error.name ? error.name : undefined}
        />
        <Text style={styles.label}>Turno *</Text>
        <View style={styles.shifts}>
          {shifts.map((item) => (
            <Pressable
              key={item}
              onPress={() => setShift(item)}
              style={[styles.shift, shift === item && styles.shiftActive]}
            >
              <Text
                style={[
                  styles.shiftText,
                  shift === item && styles.shiftTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Field
          label='Ano letivo *'
          value={year}
          onChangeText={setYear}
          placeholder='2026'
          keyboardType='number-pad'
          maxLength={4}
          error={error.schoolYear ? error.schoolYear : undefined}
        />
        {globalError ? <Text style={styles.error}>{globalError}</Text> : null}
        <AppButton
          title={classId ? "Salvar alterações" : "Cadastrar turma"}
          onPress={() => void submit()}
          loading={saving}
        />
        <AppButton
          title='Cancelar'
          onPress={() => router.back()}
          variant='ghost'
          style={{ marginTop: 8 }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { paddingVertical: 9, marginBottom: 28 },
  backText: { color: colors.primary, fontWeight: "700" },
  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: "900",
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    marginBottom: 25,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderColor: colors.border,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  shifts: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginBottom: 20 },
  shift: {
    borderRadius: radius.md,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#EEF2EF",
    borderWidth: 1,
    borderColor: "transparent",
  },
  shiftActive: { backgroundColor: colors.accent, borderColor: colors.primary },
  shiftText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  shiftTextActive: { color: colors.primary },
  error: { color: colors.danger, marginBottom: 12, fontSize: 13 },
});

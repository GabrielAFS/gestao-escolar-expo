import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../src/components/Screen";
import { Field } from "../../src/components/Field";
import { AppButton } from "../../src/components/AppButton";
import { colors } from "../../src/theme/tokens";
import { useSchoolStore } from "../../src/store/useSchoolStore";
import { validateSchool } from "../../src/domain/validation";

export default function SchoolFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const school = useSchoolStore((s) =>
    s.schools.find((item) => item.id === id),
  );
  const saveSchool = useSchoolStore((s) => s.saveSchool);
  const [name, setName] = useState(school?.name ?? "");
  const [address, setAddress] = useState(school?.address ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (school) {
      setName(school.name);
      setAddress(school.address);
    }
  }, [school]);
  const submit = async () => {
    const message = validateSchool({ name, address });
    if (message) {
      setError(message);
      return;
    }
    setSaving(true);
    setError("");
    try {
      await saveSchool({ name, address }, id);
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
      <Pressable onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>‹ Voltar para escolas</Text>
      </Pressable>
      <Text style={styles.eyebrow}>CADASTRO DE UNIDADE</Text>
      <Text style={styles.title}>{id ? "Editar escola" : "Nova escola"}</Text>
      <Text style={styles.subtitle}>
        Preencha as informações da unidade escolar abaixo.
      </Text>
      <View style={styles.form}>
        <Field
          label="Nome da escola *"
          value={name}
          onChangeText={setName}
          placeholder="Ex.: Escola Municipal Aurora"
          autoCapitalize="words"
          error={error && !name.trim() ? error : undefined}
        />
        <Field
          label="Endereço completo *"
          value={address}
          onChangeText={setAddress}
          placeholder="Rua, número, bairro"
          autoCapitalize="sentences"
          error={error && !address.trim() ? error : undefined}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton
          title={id ? "Salvar alterações" : "Cadastrar escola"}
          onPress={() => void submit()}
          loading={saving}
        />
        <AppButton
          title="Cancelar"
          onPress={() => router.back()}
          variant="ghost"
          style={{ marginTop: 8 }}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  back: { paddingVertical: 9, marginBottom: 28 },
  backText: { color: colors.primary, fontWeight: "700", fontSize: 14 },
  eyebrow: {
    color: colors.primary,
    letterSpacing: 1.6,
    fontSize: 10,
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
  error: { color: colors.danger, marginBottom: 12, fontSize: 13 },
});

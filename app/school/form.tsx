import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, VStack } from "@gluestack-ui/themed";
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
  const [error, setError] = useState({ name: "", address: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (school) {
      setName(school.name);
      setAddress(school.address);
    }
  }, [school]);

  const submit = async () => {
    const errors = validateSchool({ name, address });

    if (errors.name || errors.address) {
      setError(errors);
      return;
    }

    setSaving(true);
    setError({ name: "", address: "" });

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
      <Pressable onPress={() => router.back()} py={9} mb={28}>
        <Text color={colors.primary} fontWeight="$bold" fontSize={14}>
          ‹ Voltar para escolas
        </Text>
      </Pressable>
      <Text
        color={colors.primary}
        letterSpacing={1.6}
        fontSize={10}
        fontWeight="$black"
        mb={10}
      >
        CADASTRO DE UNIDADE
      </Text>
      <Text
        color={colors.text}
        fontSize={30}
        fontWeight="$extrabold"
        letterSpacing={-0.8}
      >
        {id ? "Editar escola" : "Nova escola"}
      </Text>
      <Text color={colors.muted} fontSize={14} lineHeight={21} mt={9} mb={25}>
        Preencha as informações da unidade escolar abaixo.
      </Text>
      <VStack
        bg="#fff"
        borderRadius={20}
        p={18}
        borderColor={colors.border}
        borderWidth={1}
      >
        <Field
          label="Nome da escola *"
          value={name}
          onChangeText={setName}
          placeholder="Ex.: Escola Municipal Aurora"
          autoCapitalize="words"
          error={error.name ? error.name : undefined}
        />
        <Field
          label="Endereço completo *"
          value={address}
          onChangeText={setAddress}
          placeholder="Rua, número, bairro"
          autoCapitalize="sentences"
          error={error.address ? error.address : undefined}
        />
        <AppButton
          title={id ? "Salvar alterações" : "Cadastrar escola"}
          onPress={() => void submit()}
          loading={saving}
          style={{ marginTop: 12 }}
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

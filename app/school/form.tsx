import React from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text } from "@gluestack-ui/themed";
import { Screen } from "../../src/components/Screen";
import { colors } from "../../src/theme/tokens";
import { useSchoolStore } from "../../src/store/useSchoolStore";
import { useSchoolForm } from "../../src/features/schools/hooks/useSchoolForm";
import { SchoolFormCard } from "../../src/features/schools/components";

export default function SchoolFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const school = useSchoolStore((state) =>
    state.schools.find((item) => item.id === id),
  );
  const form = useSchoolForm(school);

  const submit = async () => {
    try {
      if (await form.submit(id)) router.back();
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
      <SchoolFormCard
        name={form.name}
        address={form.address}
        onNameChange={form.setName}
        onAddressChange={form.setAddress}
        errors={form.error}
        onSubmit={() => void submit()}
        onCancel={() => router.back()}
        saving={form.saving}
        isEditing={Boolean(id)}
      />
    </Screen>
  );
}

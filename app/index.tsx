import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { Screen } from "../src/components/Screen";
import { AppButton } from "../src/components/AppButton";
import { colors } from "../src/theme/tokens";
import { useSchoolStore } from "../src/store/useSchoolStore";
import { useSchoolList } from "../src/hooks/useSchoolList";
import { countSchoolClasses } from "../src/utils/school";
import {
  SchoolBrand,
  SchoolCard,
  SchoolEmptyState,
  SchoolListHeader,
  SchoolStats,
} from "../src/features/schools/components";

export default function SchoolsScreen() {
  const router = useRouter();
  const schools = useSchoolStore((state) => state.schools);
  const removeSchool = useSchoolStore((state) => state.removeSchool);
  const { query, setQuery, filtered } = useSchoolList(schools);

  const confirmDelete = (id: string, name: string) =>
    Alert.alert("Excluir escola?", `“${name}” e suas turmas serão removidas.`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => void removeSchool(id),
      },
    ]);

  return (
    <Screen>
      <SchoolBrand />
      <Text
        color={colors.primary}
        letterSpacing={2}
        fontSize={10}
        fontWeight="$black"
        mb={10}
      >
        PAINEL DE CONTROLE
      </Text>
      <Text
        fontSize={34}
        lineHeight={39}
        color={colors.text}
        fontWeight="$extrabold"
        letterSpacing={-1.1}
      >
        Suas escolas,{"\n"}em um só lugar.
      </Text>
      <Text
        color={colors.muted}
        fontSize={15}
        lineHeight={23}
        mt={12}
        maxWidth={420}
      >
        Acompanhe unidades escolares e organize as turmas do ano letivo.
      </Text>

      <SchoolStats
        schoolCount={schools.length}
        classCount={countSchoolClasses(schools)}
      />

      <SchoolListHeader count={filtered.length} />

      <Input
        bg="#fff"
        borderWidth={1}
        borderColor={colors.border}
        borderRadius={16}
        height={50}
        mb={12}
        px={15}
      >
        <InputField
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por escola ou endereço"
          placeholderTextColor="#89968F"
          color={colors.text}
          fontSize={15}
          accessibilityLabel="Buscar escolas"
        />
      </Input>
      <AppButton
        title="+  Adicionar escola"
        onPress={() => router.push("/school/form")}
        style={{ marginBottom: 18 }}
      />

      {filtered.length === 0 ? (
        <SchoolEmptyState />
      ) : (
        filtered.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            onPress={() => router.push(`/school/${school.id}`)}
            onDelete={() => confirmDelete(school.id, school.name)}
          />
        ))
      )}
      <VStack alignItems="center">
        <Text
          textAlign="center"
          color="#98A49D"
          fontSize={9}
          fontWeight="$extrabold"
          letterSpacing={1.6}
          mt={24}
          mb={6}
        >
          GESTÃO ESCOLAR · VERSÃO 1.0
        </Text>
      </VStack>
    </Screen>
  );
}
